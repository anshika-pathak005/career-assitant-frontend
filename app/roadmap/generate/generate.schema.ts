// app/roadmap/generate/generate.schema.ts

import { z } from "zod";

/* ─── Form Schema ────────────────────────────────────────────────── */
export const generateSchema = z.object({
  // Editable profile fields
  currentRole: z.string().optional(),
  industries: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  workPreference: z.string().optional(),

  // Required fields
  experienceYears: z.number(),
  goalType: z.string().min(1, "Please select your goal"),
  projectLevel: z.string().min(1, "Please select your project level"),
  learningStyle: z.string().min(1, "Please select your learning style"),
  weeklyHours: z.number(),
  specialization: z.string().optional(),
});

export type FormData = z.infer<typeof generateSchema>;

/* ─── Skill Level Item ───────────────────────────────────────────── */
export interface SkillLevelItem {
  name: string;
  level: string;
}
