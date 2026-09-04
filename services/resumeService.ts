import axiosInstance from "@/lib/axiosInstance";
import type {
  ResumeAnalysisResponse,
  ResumeSummary,
  ResumeDetailResponse,
} from "@/types/resume.types";

/* ─── Service functions ──────────────────────────────────────────── */

/**
 * POST /api/resume/upload
 * Uploads a PDF resume file and returns full analysis.
 */
export const uploadAndAnalyzeResume = async (
  file: File,
): Promise<ResumeAnalysisResponse> => {
  const form = new FormData();
  form.append("file", file);

  const { data } = await axiosInstance.post<ResumeAnalysisResponse>(
    "/api/resume/upload",
    form,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data;
};

/**
 * GET /api/resume/latest
 * Fetches the most recent analysis for the authenticated user.
 */
export const getLatestAnalysis =
  async (): Promise<ResumeAnalysisResponse | null> => {
    try {
      const { data } =
        await axiosInstance.get<ResumeAnalysisResponse>("/api/resume/latest");
      return data;
    } catch {
      // Returns null if no analysis exists yet
      return null;
    }
  };

/**
 * GET /api/resume/my-resumes
 * Fetches the all resume analysis for the authenticated user.
 */
export const getUserResumes = async (): Promise<ResumeSummary[]> => {
  const { data } = await axiosInstance.get<ResumeSummary[]>(
    "/api/resume/my-resumes",
  );
  return data;
};

/**
 * GET /api/resume/${resumeId}
 * Fetches the specific resume analysis according to userId for the authenticated user.
 */
export const getResumeAnalysis = async (
  resumeId: number,
): Promise<ResumeDetailResponse> => {
  const { data } = await axiosInstance.get<ResumeDetailResponse>(
    `/api/resume/${resumeId}`,
  );
  return data;
};