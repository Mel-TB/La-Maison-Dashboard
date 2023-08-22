import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBooking } from "../../../lib/api/apiBookings";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        is_paid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () =>
      toast.error("An error occurred while checking in. Please try again"),
  });

  return { checkin, isCheckingIn };
};
