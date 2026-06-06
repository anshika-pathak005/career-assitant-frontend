// hooks/useRouteGuard.ts

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./useAuth"; // ← Use Auth context
import {
  isAuthRoute,
  isPublicRoute,
  isProtectedRoute,
} from "@/constants/routes";

export function useRouteGuard() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth(); // ← Get from context
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Wait for auth to load
    if (isLoading) return;

    const currentPath = pathname || "/";

    // Case 1: Authenticated user trying to access AUTH routes (/, /login, /register)
    if (isAuthenticated && isAuthRoute(currentPath)) {
      router.replace("/dashboard");
      setIsAuthorized(false);
      setIsChecking(false);
      return;
    }

    // Case 2: Unauthenticated user trying to access PROTECTED routes
    if (!isAuthenticated && isProtectedRoute(currentPath)) {
      router.replace("/login");
      setIsAuthorized(false);
      setIsChecking(false);
      return;
    }

    // Case 3: All other cases - allow access
    setIsAuthorized(true);
    setIsChecking(false);
  }, [pathname, router, isAuthenticated, isLoading]);

  return { isAuthorized, isChecking };
}
