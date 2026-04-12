import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/userService";
import { useAuth } from "@/hooks/useAuth";

export const USER_QUERY_KEY = ["user", "me"] as const;

/**
 * useUser — fetches the authenticated user's profile.
 * Only runs when the user is authenticated.
 */
export const useUser = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: getMe,
    enabled: isAuthenticated,
  });
};
