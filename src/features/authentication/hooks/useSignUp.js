import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useSignUp = () => {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Account successfully registered. Please verify your email address "
      );
    },
  });

  return { signUp, isLoading };
};
