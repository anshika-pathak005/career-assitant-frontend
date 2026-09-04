// utils/profileLabels.ts

import {
  ROADMAP_GOAL_TYPES,
  LEARNING_STYLES,
  PROJECT_LEVEL_OPTIONS,
  WORK_PREFERENCE_OPTIONS,
} from "@/constants/roadmap.constants";

type Option = { value: string; label: string };

/** Look up an option's display label, falling back to the raw value. */
const labelFrom = (options: readonly Option[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;

export const getGoalTypeLabel = (value: string) =>
  labelFrom(ROADMAP_GOAL_TYPES, value);

export const getLearningStyleLabel = (value: string) =>
  labelFrom(LEARNING_STYLES, value);

export const getProjectLevelLabel = (value: string) =>
  labelFrom(PROJECT_LEVEL_OPTIONS, value);

export const getWorkPreferenceLabel = (value: string) =>
  labelFrom(WORK_PREFERENCE_OPTIONS, value);

/** Bucket a raw year count into the range wording used across the app. */
export const getExperienceLabel = (value: number): string => {
  if (value === 0) return "0 years (Fresher)";
  if (value === 1) return "1 year";
  if (value <= 2) return "1-2 years";
  if (value <= 4) return "2-4 years";
  if (value <= 7) return "4-7 years";
  return "7+ years";
};
