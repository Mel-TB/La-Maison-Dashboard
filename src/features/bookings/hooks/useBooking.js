import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getBooking } from "../../../lib/api/apiBookings";

export const useBooking = () => {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, error, booking };
};
