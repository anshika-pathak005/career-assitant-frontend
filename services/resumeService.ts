import axiosInstance from "@/lib/axiosInstance";

/* ─── Types ──────────────────────────────────────────────────────── */

export interface ResumeAnalysis {
  fullName: string;
  email: string;
  phone: string;
  overallScore: number;
  atsScore: number;
  summary: string;
  experienceLevel: string;
  experienceYears: number;
  currentRole: string;
  technicalSkills: string[];
  softSkills: string[];
  strengths: string[];
  improvements: string[];
  missingSkills: string[];
  missingKeywords: string[];
}

export interface CareerGuidance {
  recommendedRoles: string[];
  learningRoadmap: string[];
  projectSuggestions: string[];
  careerAdvice: string;
}

export interface ResumeAnalysisResponse {
  resumeId: number;
  fileName: string;
  message: string;
  analysis: ResumeAnalysis;
  careerGuidance: CareerGuidance;
}

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
 * POST /api/resume/analyze-from-profile
 * Generates career analysis using the user's saved profile data.
 * Payload can be empty {} or contain override fields.
 */
export const analyzeFromProfile = async (
  overrides: Record<string, unknown> = {},
): Promise<ResumeAnalysisResponse> => {
  const { data } = await axiosInstance.post<ResumeAnalysisResponse>(
    "/api/resume/analyze-from-profile",
    overrides,
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
