import axiosInstance from "@/lib/axiosInstance";
import type { AuthUser } from "@/providers/AuthProvider";

/* ─── Request / Response types ───────────────────────────────────── */
export interface RegisterStep1Payload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterStep1Response {
  userId: number;
  email: string;
  name: string;
  wizardStep: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export interface Step2Payload {
  role: string;
  dreamJob: string;
  industries: string[];
  skills: string[];
  experienceYears: string;
  currentRole: string;
}

/* ─── Service functions ──────────────────────────────────────────── */

/** POST /api/auth/register/step1 */
export const registerStep1 = async (
  payload: RegisterStep1Payload,
): Promise<RegisterStep1Response> => {
  const { data } = await axiosInstance.post<RegisterStep1Response>(
    "/api/auth/register/step1",
    payload,
  );
  return data;
};

/** POST /api/auth/login */
export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    "/api/auth/login",
    payload,
  );
  return data;
};

/** PUT /api/auth/step2  (requires auth) */
export const completeStep2 = async (
  payload: Step2Payload,
): Promise<AuthUser> => {
  const { data } = await axiosInstance.put<AuthUser>(
    "/api/auth/step2",
    payload,
  );
  return data;
};

/** POST /api/auth/logout  (requires auth) */
export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post("/api/auth/logout");
};
