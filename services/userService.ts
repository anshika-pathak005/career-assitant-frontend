import axiosInstance from "@/lib/axiosInstance";
import type { AuthUser } from "@/providers/AuthProvider";

/* ─── Service functions ──────────────────────────────────────────── */

/** GET /api/users/me */
export const getMe = async (): Promise<AuthUser> => {
  const { data } = await axiosInstance.get<AuthUser>("/api/users/me");
  return data;
};

/** PUT /api/users/me */
export const updateProfile = async (
  payload: Partial<AuthUser>,
): Promise<AuthUser> => {
  const { data } = await axiosInstance.put<AuthUser>("/api/users/me", payload);
  return data;
};
