import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBooking as deleteBookingApi } from "../../../lib/api/apiBookings";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () =>
      toast.error("An error occurred while deleting booking. Please try again"),
  });
  return { isDeleting, deleteBooking };
};
