import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUpdateCabin } from "../../../lib/api/apiCabins";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();
  // Create Cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isCreating, createCabin };
};
