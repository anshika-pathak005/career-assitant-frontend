// services/specializationService.ts
import axiosInstance from "@/lib/axiosInstance";
import type { Specialization } from "@/types/roadmap.types";

/* ─── Service functions ──────────────────────────────────────────── */

/**
 * Get specializations based on dream job
 * GET /api/roadmap/specializations?dreamJob={dreamJob}
 */
export const getSpecializations = async (
  dreamJob: string,
): Promise<Specialization[]> => {
  const { data } = await axiosInstance.get<{
    dreamJob: string;
    specializations: Specialization[];
  }>("/api/roadmap/specializations", {
    params: { dreamJob },
  });
  return data.specializations;
};
