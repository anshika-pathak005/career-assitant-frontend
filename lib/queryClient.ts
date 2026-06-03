import { QueryClient } from "@tanstack/react-query";

/* QueryClient is used when useQuery, useMutation, or query actions run.
   It manages API calls by handling caching, retry, and refetch logic automatically,
   so we don’t manually control data fetching behavior in every component. */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes → avoid unnecessary API calls
      staleTime: 0,
      retry: 1, // Retry failed GET request once before showing error
      // refetchOnWindowFocus: false, // Do not refetch data when user switches tabs
      refetchOnMount: true, // Refetch when component mounts (navigate back)
      refetchOnWindowFocus: true, // Refetch when user returns to tab
      refetchOnReconnect: true, // Refetch when internet reconnects
    },
    mutations: {
      retry: 0, // Do not retry failed POST/PUT/DELETE requests — show error immediately
    },
  },
});

export default queryClient;

/* Flow:
   - When the app starts, QueryClient is created as a global setup
   - It stays idle until any React Query hook is used

   - When useQuery / useMutation is called in a component:
       → QueryClient becomes active
       → It decides whether to fetch data or use cache
       → It applies rules like staleTime, retry, and refetch behavior

   - Result:
       → API calls are managed automatically and efficiently across the app

  - When useQuery is called:
       → QueryClient applies query rules (staleTime, cache, refetch, retry)

   - When useMutation is called:
       → QueryClient applies mutation rules (retry, side effects handling)

   - Overall:
       → QueryClient controls API behavior automatically based on the type of operation

// staleTime: data stays fresh for 5 minutes
// → within this time: return cached data, no API call
// → after this time(at 6 minutes): return cached data first, then trigger background API call to update it
*/
