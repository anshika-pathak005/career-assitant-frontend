// hooks/useUserSettings.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { clearAccessToken } from "@/lib/axiosInstance";
import { changePassword, deleteAccount } from "@/services/userService";
import type { ChangePasswordPayload } from "@/services/userService";
import { getApiErrorMessage } from "@/utils/apiError";

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
    onSuccess: () => {
      toast.success("Password changed successfully! Please login again.");
      clearAccessToken();
      queryClient.clear();
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to change password"));
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (password: string) => deleteAccount(password),
    onSuccess: () => {
      toast.success("Account deleted successfully");
      clearAccessToken();
      queryClient.clear();
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to delete account"));
    },
  });
};
