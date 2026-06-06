// hooks/useRegister.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  registerStep1,
  RegisterStep1Payload,
  RegisterStep1Response,
} from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";

export const useRegister = () => {
  const router = useRouter();
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<RegisterStep1Response, Error, RegisterStep1Payload>({
    mutationFn: registerStep1,
    onSuccess: ({ accessToken, user }) => {
      // Clear old cache before setting new user
      queryClient.clear();

      // Login the user (saves token + user to localStorage and updates auth context)
      login(accessToken, user);

      toast.success("Account created successfully!");

      // Redirect based on wizardStep
      // if (user.wizardStep === 1) {
      //   router.push("/register/step2");
      // } else {
      //   router.push("/dashboard");
      // }
      // router.push("/register/step2");
      setTimeout(() => {
        if (user.wizardStep === 1) {
          router.push("/register/step2");
        } else {
          router.push("/dashboard");
        }
      }, 100);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        "Registration failed. Please try again.";
      toast.error(message);
    },
  });
};
