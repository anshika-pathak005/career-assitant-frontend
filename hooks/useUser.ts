import { useQuery } from "@tanstack/react-query";
// import { getMe } from "@/services/userService";
import { useAuth } from "@/hooks/useAuth";

export const USER_QUERY_KEY = ["user", "me"] as const;

/**
 * useUser -fetches the authenticated user's profile.
 * Only runs when the user is authenticated.
 */
/*
 * useUser:
 * - This hook is used to get the logged-in user's data from the backend (GET request)
 *
 * - It uses useQuery, which automatically handles:
 *     → calling the API
 *     → storing the data in cache
 *     → reusing the data across the app
 *
 * - queryKey is a unique name ("user", "me") used by React Query
 *   to store and identify this data in cache
 *
 * - queryFn: getMe
 *     → This is the actual function that makes the API call (in services/userService.ts)
 *     → It sends a request to backend (via axiosInstance)
 *     → Returns the user data from server
 *
 * - enabled: isAuthenticated ensures that:
 *     → API will run only if the user is logged in
 *     → if user is not logged in, API call will be skipped
 *
 * - If data is already in cache and still fresh:
 *     → it returns the cached data instantly (no API call)
 *
 * - If data becomes old (stale):
 *     → it still shows cached data first (fast UI)
 *     → then makes API call in background to update it
 *
 * - Overall:
 *     → no need to manually handle loading, error, or caching
 *     → React Query manages everything automatically
 *
 * - Component calls this hook (useUser), and React Query internally executes queryFn (getMe) to fetch and cache user data automatically and returns it to the component, while also managing loading and error states behind the scenes
 */
// export const useUser = () => {
//   const { isAuthenticated } = useAuth();

//   return useQuery({
//     queryKey: USER_QUERY_KEY,
//     queryFn: getMe,
//     enabled: isAuthenticated,
//   });
// };
