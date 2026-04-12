import { useAuthContext } from "@/providers/AuthProvider";

/**
 * useAuth — access current user, auth state, login/logout actions.
 * Must be used inside AuthProvider.
 */
export const useAuth = () => useAuthContext();
