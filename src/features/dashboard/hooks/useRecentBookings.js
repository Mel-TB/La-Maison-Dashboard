import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookingsAfterDate } from "../../../lib/api/apiBookings";

export const useRecentBookings = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // Calculate date and convert it to string
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { bookings, isLoading };
};
