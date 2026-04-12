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

/* ─── Types ──────────────────────────────────────────────────────── */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  wizardStep?: number;
  isProfileComplete?: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

/* ─── Context ────────────────────────────────────────────────────── */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ─── Provider ───────────────────────────────────────────────────── */
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from localStorage on mount (SSR-safe)
  useEffect(() => {
    const token = getAccessToken();
    const stored = localStorage.getItem("authUser");
    if (token && stored) {
      try {
        setUser(JSON.parse(stored) as AuthUser);
      } catch {
        clearAccessToken();
        localStorage.removeItem("authUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((token: string, authUser: AuthUser) => {
    setAccessToken(token);
    localStorage.setItem("authUser", JSON.stringify(authUser));
    setUser(authUser);
  }, []);

  const logout = useCallback(() => {
    clearAccessToken();
    localStorage.removeItem("authUser");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ─── Hook ───────────────────────────────────────────────────────── */
export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
}
