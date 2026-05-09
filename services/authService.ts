import axiosInstance, { setAccessToken } from "@/lib/axiosInstance";
import type { AuthUser } from "@/providers/AuthProvider";
import { convertExperienceToNumber } from "@/app/register/step2/step2.constants";

/* ─── Request / Response types ───────────────────────────────────── */
export interface RegisterStep1Payload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterStep1Response {
  message: string;
  userId: number;
  email: string;
  name: string;
  wizardStep: number;
  accessToken: string;
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
  userCategory: string;
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

  if (data.accessToken) {
    // localStorage.setItem("accessToken", data.accessToken);
    setAccessToken(data.accessToken);
  }
  
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

/** PUT /api/auth/register/step2  (requires auth) */
export const registerStep2 = async (
  payload: Step2Payload,
): Promise<AuthUser> => {

  const transformedPayload = {
  ...payload,
  experienceYears: convertExperienceToNumber(payload.experienceYears),
};

  const { data } = await axiosInstance.put<AuthUser>(
    "/api/auth/register/step2",
    transformedPayload,
  );
  return data;
};

/** POST /api/auth/logout  (requires auth) */
export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post("/api/auth/logout");
};
