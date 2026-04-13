import { QueryClient } from "@tanstack/react-query";

/* QueryClient is used when useQuery, useMutation, or query actions run.
   It manages API calls by handling caching, retry, and refetch logic automatically,
   so we don’t manually control data fetching behavior in every component. */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes → avoid unnecessary API calls
      retry: 1, // Retry failed GET request once before showing error
      refetchOnWindowFocus: false, // Do not refetch data when user switches tabs
    },
    mutations: {
      retry: 0, // Do not retry failed POST/PUT/DELETE requests — show error immediately
    },
  },
});

export default queryClient;
