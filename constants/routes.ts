// constants/routes.ts

// Everyone can access these (both logged-in and logged-out)
export const PUBLIC_ROUTES = [
  "/pricing",
  "/features",
  "/about",
  "/help",
  "/privacy",
  "/terms",
  "/contact",
  "/help",
];

//Logged-out users only - if logged-in, redirect to dashboard
export const AUTH_ROUTES = ["/", "/login", "/register",];

// Logged-in users only - if logged-out, redirect to login
const PROTECTED_ROUTES = [
  "/dashboard",
  "/register/step2",
  "/roadmap",
  "/roadmap/generate",
  "/roadmap/[id]",
  "/resume-analysis",
  "/resume-analysis/analysis",
  "/resume-analysis/[id]",
  "/chat",
  "/jobs",
  "/skills",
  "/progress",
  "/profile",
  "/settings",
];

// Helper functions
export const isAuthRoute = (pathname: string): boolean => {
  return AUTH_ROUTES.includes(pathname);
};

export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(route),
  );
};

export const isProtectedRoute = (pathname: string): boolean => {
  // Exact match
  if (PROTECTED_ROUTES.includes(pathname)) return true;

  // Dynamic routes
  if (pathname?.startsWith("/roadmap/") && pathname !== "/roadmap") return true;
  if (
    pathname?.startsWith("/resume-analysis/") &&
    pathname !== "/resume-analysis"
  )
    return true;

  return false;
};
