// hooks/useRoadmap.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  generateRoadmap,
  getRoadmapById,
  getUserRoadmaps,
  getLatestRoadmap,
  updateStepCompletion,
} from "@/services/roadmapService";
import type { RoadmapGenerationRequest } from "@/types/roadmap.types";
import { getApiErrorMessage } from "@/utils/apiError";

/* ─── Query keys ─────────────────────────────────────────────────── */
export const ROADMAP_KEYS = {
  all: ["roadmap"] as const,
  detail: (id: number) => ["roadmap", id] as const,
  user: () => ["roadmap", "user"] as const,
  latest: () => ["roadmap", "latest"] as const,
};

/* ─── Hook: Generate roadmap (mutation) ─────────────────────────── */
export const useGenerateRoadmap = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateRoadmap,
    onSuccess: (roadmap) => {
      toast.success("Roadmap generated successfully!");
      // Invalidate user roadmaps cache
      queryClient.invalidateQueries({ queryKey: ROADMAP_KEYS.user() });
      queryClient.invalidateQueries({ queryKey: ROADMAP_KEYS.latest() });
      // Redirect to the new roadmap
      router.push(`/roadmap/${roadmap.roadmapId}`);
    },
    onError: (error) => {
      const message = getApiErrorMessage(
        error,
        "Failed to generate roadmap. Please try again.",
      );
      if (
        message.toLowerCase().includes("complete your profile") ||
        message.toLowerCase().includes("dream job")
      ) {
        toast.error(message, {
          action: {
            label: "Complete Profile",
            onClick: () => router.push("/register/step2"),
          },
        });
      } else {
        toast.error(message);
      }
    },
  });
};

/* ─── Hook: Get roadmap by ID ───────────────────────────────────── */
export const useRoadmap = (id: number) => {
  return useQuery({
    queryKey: ROADMAP_KEYS.detail(id),
    queryFn: () => getRoadmapById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/* ─── Hook: Get all user roadmaps ───────────────────────────────── */
export const useUserRoadmaps = () => {
  return useQuery({
    queryKey: ROADMAP_KEYS.user(),
    queryFn: getUserRoadmaps,
    staleTime: 1000 * 60 * 5,
  });
};

/* ─── Hook: Get latest roadmap ──────────────────────────────────── */
export const useLatestRoadmap = () => {
  return useQuery({
    queryKey: ROADMAP_KEYS.latest(),
    queryFn: getLatestRoadmap,
    staleTime: 1000 * 60 * 5,
  });
};

/* ─── Hook: Update step completion (mutation) ───────────────────── */
export const useUpdateStepCompletion = (roadmapId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      stepId,
      completed,
      skipped = false,
    }: {
      stepId: number;
      completed: boolean;
      skipped :boolean;
    }) => updateStepCompletion(roadmapId, stepId, completed,skipped),
    onSuccess: () => {
      // Invalidate both roadmap detail and user roadmaps cache
      queryClient.invalidateQueries({
        queryKey: ROADMAP_KEYS.detail(roadmapId),
      });
      queryClient.invalidateQueries({ queryKey: ROADMAP_KEYS.user() });
      queryClient.invalidateQueries({ queryKey: ROADMAP_KEYS.latest() });
    },
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "Failed to update step. Please try again."),
      );
    },
  });
};
