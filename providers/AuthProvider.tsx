  "use client";

  import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
  } from "react";
  import {
    getAccessToken,
    setAccessToken,
    clearAccessToken,
  } from "@/lib/axiosInstance";
  import queryClient from "@/lib/queryClient";

  /* ─── Types ──────────────────────────────────────────────────────── */

  /**
   * AuthUser:
   * - Represents the authenticated user object
   * - Matches the user data received from backend
   */
  export interface AuthUser {
    id: number;
    name: string;
    email: string;
    wizardStep?: number;
    isProfileComplete?: boolean;
  }

  /**
   * AuthContextValue:
   * - Defines what values will be shared globally via context
   */
  interface AuthContextValue {
    user: AuthUser | null; // current logged-in user
    isAuthenticated: boolean; // derived state (true if user exists)
    isLoading: boolean; // used while restoring session
    login: (token: string, user: AuthUser) => void; // login handler
    logout: () => void; // logout handler
  }

  /* ─── Context ────────────────────────────────────────────────────── */

  /**
   * AuthContext:
   * - Creates a global auth state container (user, login, logout, etc.)
   * - Avoids prop drilling by sharing data across the app
   * - Default is set to undefined so if a component tries to access this context
   *   without being wrapped inside AuthProvider (i.e., outside its component tree),
   *   it won’t receive any value. This helps detect incorrect usage and avoids
   *   accessing undefined data silently.
   */
  const AuthContext = createContext<AuthContextValue | undefined>(undefined);

  /* ─── Provider ───────────────────────────────────────────────────── */

  /**
   * AuthProvider:
   * - Wraps a part (or whole) of the app and makes auth data available
   *   to all child components via React Context
   *
   * - Maintains auth state internally using React state (user, loading)
   *   → any update here triggers re-render across all consumers
   *
   * - Syncs authentication data with:
   *   → localStorage (to persist user across page reloads)
   *   → access token helpers (to manage token in memory + storage)
   *
   * - Acts as the single source of truth for authentication
   *   → components don’t manage auth individually, they read from here
   */
  export default function AuthProvider({ children }: { children: ReactNode }) {
    // user state:
    // - Stores the currently logged-in user
    // - Can be either an AuthUser object (when logged in) or null (when not logged in)
    const [user, setUser] = useState<AuthUser | null>(null);

    // isLoading state:
    // - Indicates whether auth data is being initialized (e.g., reading from localStorage)
    // - Helps prevent UI from rendering before auth state is ready
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Hydration on mount:
     * - Loading stored data back into React state on initial render
     * - Reads token and user from localStorage
     * - Restores session if valid data exists:
     * - If a valid token and user data are found in storage,
     *   the app automatically logs the user in again without requiring manual login
     * /**
     * Recovers lost state after a page refresh:
     * - Since React state resets on refresh, stored data is used to rebuild the state
     * - Ensures the app continues from the previous session instead of starting fresh
     */
    useEffect(() => {
      const token = getAccessToken();
      const stored = localStorage.getItem("authUser");
      if (token && stored) {
        try {
          setUser(JSON.parse(stored) as AuthUser);
        } catch {
          // If parsing fails → clear invalid data
          clearAccessToken();
          localStorage.removeItem("authUser");
        }
      }
      setIsLoading(false); // hydration complete
    }, []);

    /**
     * login:
     * - Saves access token (memory + localStorage)
     * - Stores user data in localStorage
     * - Updates React state → triggers re-render across app
     */
    const login = useCallback((token: string, authUser: AuthUser) => {
      // IMPORTANT: Clear old cache before setting new user
      queryClient.clear();

      // Set new auth data
      setAccessToken(token);
      localStorage.setItem("authUser", JSON.stringify(authUser));
      setUser(authUser);
    }, []);

    /**
     * logout:
     * - Clears token from storage
     * - Removes user from localStorage
     * - Resets React state → user becomes null
     */
    const logout = useCallback(() => {
      // Clear token from storage
      clearAccessToken();

      // Clear all React Query cache - THIS IS CRITICAL
      queryClient.clear();

      // Remove user from localStorage
      localStorage.removeItem("authUser");

      // Reset React state
      setUser(null);

      // Force reload to clear any lingering state in memory
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }, []);

    /**
     * clearAuthData:
     * - Completely wipes all auth-related data
     * - Used internally by logout and login for clean state
     */
    const clearAuthData = useCallback(() => {
      clearAccessToken();
      localStorage.removeItem("authUser");
      queryClient.clear();
      setUser(null);
    }, []);

    /**
     * Provider:
     * - Makes auth state globally available
     * - Any component inside can access via useAuthContext / useAuth
     */
    return (
      <AuthContext.Provider
        value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  /* ─── Hook ───────────────────────────────────────────────────────── */
  /**
   * useAuthContext:
   * - Custom hook to access AuthContext safely
   * - Internally uses useContext
   * - Throws error if used outside AuthProvider (prevents misuse)
   */
  export function useAuthContext(): AuthContextValue {
    // ctx Reads and returns the current value from AuthContext.Provider (auth state and actions like user, login, logout)
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
    return ctx;
  }
