// hooks/useSpecializations.ts
import { useQuery } from "@tanstack/react-query";
import { getSpecializations } from "@/services/specializationService";

/* ─── Query keys ─────────────────────────────────────────────────── */
export const SPECIALIZATION_KEYS = {
  all: ["specializations"] as const,
  byDreamJob: (dreamJob: string) => ["specializations", dreamJob] as const,
};

/* ─── Hook: Get specializations by dream job ────────────────────── */
export const useSpecializations = (dreamJob: string) => {
  return useQuery({
    queryKey: SPECIALIZATION_KEYS.byDreamJob(dreamJob),
    queryFn: () => getSpecializations(dreamJob),
    enabled: !!dreamJob && dreamJob.trim().length > 0,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
