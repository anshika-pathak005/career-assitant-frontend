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
}

/* ─── Profile Update Request (partial) ──────────────────────────── */
export type ProfileUpdateRequest = Partial<UserProfile>;
