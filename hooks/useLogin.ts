import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser, LoginPayload, LoginResponse } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";

/**
 * useLogin — wraps the login API call with React Query mutation.
 * On success: stores token, updates auth state, redirects to dashboard.
 * On error:   shows a toast notification.
 */
export const useLogin = () => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: ({ accessToken, user }) => {
      login(accessToken, user);
      toast.success(`Welcome back, ${user.name}!`);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ?? "Login failed. Please try again.";
      toast.error(message);
    },
  });
};
