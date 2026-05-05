// types/profile.types.ts
// User profile type definitions matching backend response

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
  skillLevels: Record<string, string> | null;
  wizardStep: number;
  isProfileComplete: boolean;
}

/* ─── Profile Update Request (partial) ──────────────────────────── */
export type ProfileUpdateRequest = Partial<UserProfile>;
