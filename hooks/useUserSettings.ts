// hooks/useUserSettings.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { clearAccessToken } from "@/lib/axiosInstance";
import { changePassword, deleteAccount } from "@/services/userService";
import type { ChangePasswordPayload } from "@/services/userService";

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
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to change password";
      toast.error(message);
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
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to delete account";
      toast.error(message);
    },
  });
};
