/**
 * Formats an ISO date string to a human-readable form.
 * e.g. "2024-06-15T10:30:00Z" → "Jun 15, 2024"
 */
export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/**
 * Formats an ISO date string to time.
 * e.g. "2024-06-15T10:30:00Z" → "10:30 AM"
 */
export const formatTime = (iso: string): string =>
  new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
