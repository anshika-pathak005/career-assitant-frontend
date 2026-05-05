import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  uploadAndAnalyzeResume,
  analyzeFromProfile,
  getLatestAnalysis,
  type ResumeAnalysisResponse,
} from "@/services/resumeService";

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
      router.push(`/analysis?resumeId=${data.resumeId}`);
    },
    onError: () => toast.error("Failed to analyze resume. Please try again."),
  });
};

/** Analyze from profile data (with optional overrides) → redirect. */
export const useAnalyzeFromProfile = () => {
  const router = useRouter();
  return useMutation<ResumeAnalysisResponse, Error, Record<string, unknown>>({
    mutationFn: analyzeFromProfile,
    onSuccess: (data) => {
      toast.success("Career analysis ready!");
      router.push(`/analysis?resumeId=${data.resumeId}`);
    },
    onError: () => toast.error("Analysis failed. Please try again."),
  });
};
