import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserProfile,
  // type UserProfile,
} from "@/services/userService";
import { UserProfile } from "@/types/profile.types";

export const USER_PROFILE_KEY = ["user", "profile"] as const;

/** Fetch the authenticated user's full profile. */
export const useUserProfile = () =>
  useQuery({
    queryKey: USER_PROFILE_KEY,
    queryFn: getUserProfile,
    staleTime: 0, // Always fetch fresh data
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

/** Partially update the user's profile. */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updated) => {
      queryClient.setQueryData<UserProfile>(USER_PROFILE_KEY, updated);
    },
  });
};
