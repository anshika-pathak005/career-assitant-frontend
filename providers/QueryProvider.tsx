"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import queryClient from "@/lib/queryClient";

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

/*
  QueryProvider

  - Wraps the entire app with React Query support
  - Provides a single shared queryClient to all components

  Why needed:
  - React Query needs queryClient to handle:
      → caching
      → API requests
      → retries
      → background updates

  How it works:
  - queryClient is created once in /lib/queryClient
  - This provider makes it available globally using React Context
  - Any component inside this wrapper can then use useQuery / useMutation automatically

  "use client" ensures that this file is executed on the browser (client side) instead of being rendered on the server by Next.js. This is important for React Query because it relies on client-side features like in-memory caching, state management, and real-time UI updates based on API calls. Since QueryClient manages things like cached data, loading states, retries, and background refetching, it needs a live browser environment where state can persist during user interactions. Without "use client", this file would be treated as a Server Component, and React Query hooks like useQuery and useMutation would not work properly because there would be no client-side runtime to manage and update the query cache dynamically.
*/
