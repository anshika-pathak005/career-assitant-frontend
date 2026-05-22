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
