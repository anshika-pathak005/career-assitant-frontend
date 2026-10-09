import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  uploadAndAnalyzeResume,
  getLatestAnalysis,
  getUserResumes,
  getResumeAnalysis,
} from "@/services/resumeService";
import type { ResumeAnalysisResponse } from "@/types/resume.types";
import { getApiErrorMessage } from "@/utils/apiError";

export const LATEST_ANALYSIS_KEY = ["resume", "latest"] as const;

/** Fetch latest saved analysis (runs on dashboard load). */
export const useLatestAnalysis = () =>
  useQuery({
    queryKey: LATEST_ANALYSIS_KEY,
    queryFn: getLatestAnalysis,
    staleTime: 1000 * 60 * 10,
  });

/** Upload a PDF resume → analyze → redirect to result page. */
export const useUploadResume = () => {
  const router = useRouter();
  return useMutation<ResumeAnalysisResponse, Error, File>({
    mutationFn: uploadAndAnalyzeResume,
    onSuccess: (data) => {
      toast.success("Resume analyzed successfully!");
      // Pass resumeId via query param so the analysis page can fetch it
      // router.push(`/analysis?resumeId=${data.resumeId}`);
      router.push(`/resume-analysis/${data.resumeId}`);
    },
    onError: (error) => {
      const message = getApiErrorMessage(
        error,
        "Failed to analyze resume. Please try again.",
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

/**Get all resusme analysis of the users */
export const useUserResumes = () => {
  return useQuery({
    queryKey: ["resume", "user-resumes"],
    queryFn: getUserResumes,
    staleTime: 1000 * 60 * 5,
  });
};

// Get the specific resume by id of that particular user //
export const useResumeAnalysis = (resumeId: number) => {
  return useQuery({
    queryKey: ["resume", "analysis", resumeId],
    queryFn: () => getResumeAnalysis(resumeId),
    enabled: !!resumeId,
    staleTime: 1000 * 60 * 5,
  });
};