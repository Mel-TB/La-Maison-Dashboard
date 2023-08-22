import { useQuery } from "@tanstack/react-query";
import { fetchCabins } from "../../..//lib/api/apiCabins";

export const useCabins = () => {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: fetchCabins,
  });

  return { isLoading, error, cabins };
};
