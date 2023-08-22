import { useQuery } from "@tanstack/react-query";

import { getStaysTodayActivity } from "../../../lib/api/apiBookings";

export const useTodayActivity = () => {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isLoading };
};
