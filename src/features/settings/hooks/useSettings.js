import { useQuery } from "@tanstack/react-query";

import { getSetting } from "../../../lib/api/apiSettings";

export const useSettings = () => {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["setting"],
    queryFn: getSetting,
  });

  return { isLoading, error, settings };
};
