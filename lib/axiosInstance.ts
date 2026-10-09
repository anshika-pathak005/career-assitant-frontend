import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

/* ─── Token helpers (memory + localStorage backup) ───────────────── */

// Load access token from localStorage when app starts (only in browser)
let accessToken: string | null =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

// Return the current access token from memory
export const getAccessToken = () => accessToken;

// Save access token in memory and localStorage (for persistence)
export const setAccessToken = (t: string) => {
  accessToken = t;
  localStorage.setItem("accessToken", t);
};

// Clear access token from memory and localStorage (on logout or error)
export const clearAccessToken = () => {
  accessToken = null;
  localStorage.removeItem("accessToken");
};

/* ─── Axios instance ─────────────────────────────────────────────── */
/* Axios Instance:
   - Creates a reusable axios client for all API calls
   - Sets base URL so we don’t repeat full API URL every time
   - Enables withCredentials to automatically send cookies (HttpOnly refresh token)
   - Sets default headers to send data in JSON format
*/
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Required: sends HTTP-only refresh token cookie automatically
  headers: { "Content-Type": "application/json" },
});

/* ─── Request interceptor -attach accessToken ───────────────────── */
/* Request Interceptor:
   - Runs before every API request
   - 'config' contains request details (URL, method, headers, data)
   - Gets access token from storage (memory/localStorage)
   - If token exists, adds it to Authorization header
   - Format: Bearer <token>
   - Ensures all requests are authenticated automatically
*/
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    // console.log("TOKEN FROM INTERCEPTOR:", token);

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config; //send modified request to backend
  },
  (error) => Promise.reject(error), // forward request errors - request interceptor's error handler
);

/* ─── Response interceptor -handle 401 / token refresh ─────────── */
/* Response Interceptor:
   - Handles API responses globally
   - If 401 (token expired), refreshes access token and retries request
   - Uses queue to prevent multiple refresh calls at the same time
*/

let isRefreshing = false; // Tracks if refresh API is already running

// Queue to store requests that fail while refresh is in progress
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

/* Handle all requests waiting during token refresh:
   - If refresh succeeds → retry all queued requests with new token
   - If refresh fails → reject all queued requests with error
*/
const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response, // Return response directly if success
  async (error: AxiosError) => {
    // Save the original failed request
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // SKIP refresh for login/register endpoints - prevents unnecessary refresh calls
    const isAuthEndpoint =
      originalRequest.url?.includes("/api/auth/login") ||
      originalRequest.url?.includes("/api/auth/register");

    // If token expired (401) and request not retried yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      // If a refresh request is already running,
      // do not start another one —
      // instead, add this request to a queue and wait for the new token
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          /* Once refresh is done, retry this failed request
             with the new access token */
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      /* Mark this request so it doesn't retry infinitely
         and indicate that refresh process has started */
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        /* Call refresh API to get a new access token.
           Refresh token is sent automatically via HttpOnly cookie. */
        const { data } = await axiosInstance.post<{ accessToken: string }>(
          "/api/auth/refresh",
        );
        setAccessToken(data.accessToken); // Save new token in storage
        processQueue(null, data.accessToken); // Retry all queued requests with new token
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`; // Retry original failed request with new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        /* If refresh token also fails (expired/invalid),
           reject all queued requests and log the user out */
        processQueue(refreshError, null); // Reject all queued requests with error
        clearAccessToken(); // Clear tokens from storage

        /* Redirect user to login page (session expired) only when it is not login page itself , to prevent redicrection loop*/
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.includes("/login")
        )
          window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false; // Reset refresh flag after process ends
      }
    }

    return Promise.reject(error); // Forward other errors as-is
  },
);
// Export the configured axios instance for use in API calls across the app
export default axiosInstance;
