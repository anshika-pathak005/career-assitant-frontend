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
    // No staleTime / refetch overrides here — inherits the defaults from
    // lib/queryClient.ts. useUpdateProfile writes the fresh profile straight
    // into the cache on success, so a forced refetch was never needed.
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
