import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min — avoids unnecessary refetches
      retry: 1, // retry once on failure
      refetchOnWindowFocus: false, // prevent refetch on tab switch
    },
    mutations: {
      retry: 0,
    },
  },
});

export default queryClient;
