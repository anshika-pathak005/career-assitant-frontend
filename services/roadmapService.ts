// services/roadmapService.ts
import axiosInstance from "@/lib/axiosInstance";
import type {
  Roadmap,
  RoadmapGenerationRequest,
  RoadmapUsage,
  Specialization,
} from "@/types/roadmap.types";

/* ─── Service functions ──────────────────────────────────────────── */

/**
 * Generate a new personalized roadmap
 * POST /api/roadmap/generate
 */
export const generateRoadmap = async (
  payload: RoadmapGenerationRequest,
): Promise<Roadmap> => {
  const { data } = await axiosInstance.post<Roadmap>(
    "/api/roadmap/generate",
    payload,
  );
  return data;
};

/**
 * Get a specific roadmap by ID
 * GET /api/roadmap/{id}
 */
export const getRoadmapById = async (id: number): Promise<Roadmap> => {
  const { data } = await axiosInstance.get<Roadmap>(`/api/roadmap/${id}`);
  return data;
};

/**
 * Get all roadmaps for the current user
 * GET /api/roadmap/user
 */
export const getUserRoadmaps = async (): Promise<Roadmap[]> => {
  const { data } = await axiosInstance.get<Roadmap[]>("/api/roadmap/history");
  return data;
};

/**
 * Get the latest active roadmap for the current user
 * GET /api/roadmap/latest
 */
export const getLatestRoadmap = async (): Promise<Roadmap | null> => {
  try {
    const { data } = await axiosInstance.get<Roadmap>(
      "/api/roadmap/my-roadmap",
    );
    return data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return null; // No roadmap found
    }
    throw error;
  }
};

/**
 * Update step completion status
 * PATCH /api/roadmap/{roadmapId}/step/{stepId}
 */
export const updateStepCompletion = async (
  roadmapId: number,
  stepId: number,
  completed: boolean,
  skipped: boolean = false,
): Promise<void> => {
  await axiosInstance.patch(`/api/roadmap/${roadmapId}/step/${stepId}`, {
    completed,
    skipped,
  });
};

export const getRoadmapUsage = async (): Promise<RoadmapUsage> => {
  const { data } = await axiosInstance.get<RoadmapUsage>(
    "/api/user/roadmap-usage",
  );
  return data;
};