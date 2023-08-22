import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCabin as deleteCabinApi } from "../../../lib/api/apiCabins";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () =>
      toast.error("An error occurred while deleting cabin. Please try again"),
  });

  return { isDeleting, deleteCabin };
};
