// hooks/useSpecializations.ts
import { useQuery } from "@tanstack/react-query";
import { getSpecializations } from "@/services/specializationService";

export const SPECIALIZATION_KEYS = {
  all: ["specializations"] as const,
  byDreamJob: (dreamJob: string) => ["specializations", dreamJob] as const,
};

export const useSpecializations = (dreamJob: string) => {
  return useQuery({
    queryKey: SPECIALIZATION_KEYS.byDreamJob(dreamJob),
    queryFn: () => getSpecializations(dreamJob),
    enabled: !!dreamJob && dreamJob.trim().length > 0,
    staleTime: 1000 * 60 * 10,
  });
};
