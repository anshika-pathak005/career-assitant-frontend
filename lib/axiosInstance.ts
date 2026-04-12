import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

/* ─── Token helpers (memory + localStorage backup) ───────────────── */
let accessToken: string | null =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

export const getAccessToken = () => accessToken;
export const setAccessToken = (t: string) => {
  accessToken = t;
  localStorage.setItem("accessToken", t);
};
export const clearAccessToken = () => {
  accessToken = null;
  localStorage.removeItem("accessToken");
};

/* ─── Axios instance ─────────────────────────────────────────────── */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Required: sends HTTP-only refresh token cookie automatically
  headers: { "Content-Type": "application/json" },
});

/* ─── Request interceptor — attach accessToken ───────────────────── */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* ─── Response interceptor — handle 401 / token refresh ─────────── */
let isRefreshing = false;
// Queue of requests that arrived while a refresh was in-flight
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Park request until refresh finishes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Browser sends refresh token cookie automatically (withCredentials: true)
        const { data } = await axiosInstance.post<{ accessToken: string }>(
          "/api/auth/refresh",
        );
        setAccessToken(data.accessToken);
        processQueue(null, data.accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAccessToken();
        // Redirect to login — refresh token also expired
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
