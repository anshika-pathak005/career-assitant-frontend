// types/profile.types.ts
// User profile type definitions matching backend response

export interface GenerationLimit {
  used: number;
  total: number;
  remaining: number;
  plan: string; // "FREE" or "PRO"
  resetsOn: string; // "2026-06-01"
  limitReached: boolean;
}

export interface ActiveRoadmap {
  roadmapId: number;
  dreamJob: string;
  status: string;
  overallProgress: number;
  totalEstimatedWeeks: number;
  generatedAt: string;
}

export interface LatestResume {
  resumeId: number;
  analysisId: number;
  fileName: string;
  overallScore: number;
  atsScore: number;
  interviewReadiness: string;
  uploadedAt: string;
}

/* ─── User Profile (matches GET /api/user/profile response) ─────── */
export interface UserProfile {
  userId: number;
  name: string;
  email: string;
  userCategory: string;
  dreamJob: string;
  industries: string[];
  skills: string[];
  experienceYears: number | null;
  currentRole: string | null;
  goalType: string | null;
  projectLevel: string | null;
  workPreference: string | null;
  weeklyHours: number | null;
  learningStyle?: string | null;
  skillLevels: Record<string, string> | null;
  wizardStep: number;
  isProfileComplete: boolean;
  generationLimit?: GenerationLimit;
  resumeUsage?: GenerationLimit; 
  activeRoadmap?: ActiveRoadmap;
  latestResume?: LatestResume;
}

/* ─── Profile Update Request (partial) ──────────────────────────── */
export type ProfileUpdateRequest = Partial<UserProfile>;
