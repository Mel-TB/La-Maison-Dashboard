import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSetting as updateSettingApi } from "../../../lib/api/apiSettings";

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  // Update Settings
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully updated");
      queryClient.invalidateQueries({ queryKey: ["setting"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateSetting, isUpdating };
};
