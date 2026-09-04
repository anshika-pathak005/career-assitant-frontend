// utils/apiError.ts

/**
 * Pull a human-readable message out of an axios error.
 * Replaces the `(error as any)?.response?.data?.message` casts that were
 * repeated wherever a mutation error was rendered.
 */
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: unknown } } })
      .response;
    const message = response?.data?.message;
    if (typeof message === "string" && message.trim()) return message;
  }
  return fallback;
}

/** True when an axios error carries the given HTTP status. */
export function hasStatus(error: unknown, status: number): boolean {
  if (error && typeof error === "object" && "response" in error) {
    return (
      (error as { response?: { status?: number } }).response?.status === status
    );
  }
  return false;
}

/** Convenience wrapper for the common 404 case. */
export const isNotFound = (error: unknown) => hasStatus(error, 404);
