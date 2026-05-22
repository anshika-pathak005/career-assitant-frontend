// hooks/useDashboard.ts

import { useQuery } from "@tanstack/react-query";
import {
  getDashboardData
} from "@/services/dashboardService";
import type { DashboardResponse } from "@/types/dashboard.types";

export const DASHBOARD_KEY = ["dashboard"] as const;

export const useDashboard = () => {
  return useQuery({
    queryKey: DASHBOARD_KEY,
    queryFn: getDashboardData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
