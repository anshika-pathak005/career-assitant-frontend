import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser, LoginPayload, LoginResponse } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";

/**
 * 
 * useMutation:
 * - Used to perform actions that change data on the server (POST, PUT, DELETE)
 * - Returns a mutation object (mutate, isPending, isError, data, etc.)
 *
 * - mutate(data):
 *     → manually triggers the API call (mutationFn)
 *     → passes data to the API function
 *
 * - After API response:
 *     → onSuccess runs if request is successful
 *     → onError runs if request fails
 *
 * - Used for actions like form submit, login, signup, update, delete, etc.
 * ____________________________________________________________________________
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
