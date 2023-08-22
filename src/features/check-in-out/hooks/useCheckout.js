import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBooking } from "../../../lib/api/apiBookings";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checkout `);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () =>
      toast.error("An error has occurred while checkout, Please try again"),
  });

  return { checkout, isCheckout };
};
