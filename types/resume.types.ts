/* ─── Types ──────────────────────────────────────────────────────── */

/* ─── Legacy shape returned by the original upload endpoint ──────── */
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

/* ─── Current shape used by the analysis pages ───────────────────── */

/** One row in the resume history list (GET /api/resume/my-resumes). */
export interface ResumeSummary {
  resumeId: number;
  fileName: string;
  overallScore: number;
  atsScore: number;
  interviewReadiness: string;
  experienceLevel?: string;
  uploadedAt: string;
}

export interface ResumeScores {
  overallScore: number;
  atsScore: number;
  technicalSkillsScore: number;
  projectQualityScore: number;
  formattingScore: number;
}

export interface ResumeBasicInfo {
  fullName?: string;
  currentRole?: string;
  experienceLevel?: string;
  interviewReadiness: string;
}

export interface ResumeAnalysisDetail {
  resumeVerdict: string;
  summary: string;
  recruiterPerspective: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  prioritySkills: string[];
  atsSuggestions: string[];
  missingKeywords: string[];
  improvementSuggestions: string[];
  projectSuggestions: string[];
  recommendedLearning: string[];
  recommendedRoles: string[];
  recommendedCertifications: string[];
  sectionAnalysis: Record<string, string>;
}

/** Full analysis for one resume (GET /api/resume/{id}). */
export interface ResumeDetailResponse {
  resumeId: number;
  fileName: string;
  uploadedAt: string;
  scores: ResumeScores;
  basicInfo: ResumeBasicInfo;
  analysis: ResumeAnalysisDetail;
}
