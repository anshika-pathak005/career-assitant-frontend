// services/dashboardService.ts

import axiosInstance from "@/lib/axiosInstance";
import type {
  DashboardResponse,
  DashboardStats,
  PhaseProgress,
  CurrentPhase,
  RoadmapData,
  ResumeData,
} from "@/types/dashboard.types";

// get the user dashboard data
export const getDashboardData = async (): Promise<DashboardResponse> => {
  const { data } = await axiosInstance.get<DashboardResponse>("/api/dashboard");
  return data;
};
