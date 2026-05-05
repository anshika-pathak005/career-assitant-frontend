// import axiosInstance from "@/lib/axiosInstance";
// import type { AuthUser } from "@/providers/AuthProvider";

// /* ─── Service functions ──────────────────────────────────────────── */

// /**
//  * getMe:
//  * - This function calls the backend API to fetch the logged-in user's data
//  * - It sends a GET request to "/api/users/me" using axiosInstance
//  * - axiosInstance automatically attaches access token and handles refresh logic (if needed)
//  * - The response data (user object) is returned and typed as AuthUser
//  *
//  * How it is used in flow:
//  * - This function is used inside React Query hooks as queryFn
//  * - It is not called directly anywhere manually
//  * - React Query automatically executes it when the hook runs
//  * - QueryClient handles caching, refetching, and API state management
//  */
// /** GET /api/users/me */
// export const getMe = async (): Promise<AuthUser> => {
//   const { data } = await axiosInstance.get<AuthUser>("/api/users/me");
//   return data;
// };

// /** PUT /api/users/me */
// export const updateProfile = async (
//   payload: Partial<AuthUser>,
// ): Promise<AuthUser> => {
//   const { data } = await axiosInstance.put<AuthUser>("/api/users/me", payload);
//   return data;
// };

import axiosInstance from "@/lib/axiosInstance";

/* ─── Types ──────────────────────────────────────────────────────── */

export interface UserProfile {
  userId: number;
  name: string;
  email: string;
  userCategory: string | null;
  dreamJob: string | null;
  industries: string[];
  skills: string[];
  experienceYears: number | null;
  currentRole: string | null;
  goalType: string | null;
  projectLevel: string | null;
  workPreference: string | null;
  wizardStep: number;
  isProfileComplete: boolean;
}

/* ─── Service functions ──────────────────────────────────────────── */

/** GET /api/user/profile */
export const getUserProfile = async (): Promise<UserProfile> => {
  const { data } = await axiosInstance.get<UserProfile>("/api/user/profile");
  return data;
};

/** PUT /api/user/profile — partial update */
export const updateUserProfile = async (
  payload: Partial<UserProfile>,
): Promise<UserProfile> => {
  const { data } = await axiosInstance.put<UserProfile>(
    "/api/user/profile",
    payload,
  );
  return data;
};