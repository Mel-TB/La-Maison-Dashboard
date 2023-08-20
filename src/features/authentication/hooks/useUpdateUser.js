import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUser as userUpdate } from "../../../services/apiAuth";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: userUpdate,
    onSuccess: ({ user }) => {
      toast.success("User successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"], user });
    },
    onError: (error) => toast.error(error.message),
  });
  return { updateUser, isUpdating };
};
