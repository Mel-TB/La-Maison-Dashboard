import { useQuery } from "@tanstack/react-query";
import { getSetting } from "../../../services/apiSettings";

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
