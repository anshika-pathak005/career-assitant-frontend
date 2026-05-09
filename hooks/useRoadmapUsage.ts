// hooks/useRoadmapUsage.ts
import { useQuery } from "@tanstack/react-query";
import { getRoadmapUsage } from "@/services/roadmapService";
import type { RoadmapUsage } from "@/types/roadmap.types";

export const ROADMAP_USAGE_KEY = ["roadmap", "usage"] as const;

export const useRoadmapUsage = () => {
  return useQuery({
    queryKey: ROADMAP_USAGE_KEY,
    queryFn: getRoadmapUsage,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: true,
  });
};
