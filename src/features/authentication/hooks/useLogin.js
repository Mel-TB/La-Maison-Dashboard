import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login as loginApi } from "../../../services/apiAuth";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },

    onError: (error) => {
      console.log("Error: " + error);
      toast.error(
        "An error occurred while trying to login. Email or password are incorrect. Please try again"
      );
    },
  });
  return { login, isLoading };
};
