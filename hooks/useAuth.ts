import { useAuthContext } from "@/providers/AuthProvider";

/**
 * useAuth -lightweight wrapper around useAuthContext
 *
 * - Provides a clean and consistent way to access auth state across the app
 * - Internally calls useAuthContext to get data from React Context
 * - Helps avoid importing useAuthContext directly in every component
 *
 * Why this wrapper?
 * - Keeps code cleaner and shorter (useAuth vs useAuthContext)
 * - Acts as a single entry point for auth logic
 * - Makes it easy to extend in future (e.g., add extra checks, roles, logging)
 *
 * Usage:
 * const { user, login, logout, isAuthenticated } = useAuth();
 */
export const useAuth = () => useAuthContext();
