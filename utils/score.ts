// utils/score.ts

/**
 * Traffic-light colour for a 0-100 score.
 * Same thresholds are used on the dashboard and the resume analysis pages.
 */
export function getScoreColor(score: number): string {
  if (score >= 70) return "#16A34A"; // green
  if (score >= 50) return "#D97706"; // amber
  return "#DC2626"; // red
}
