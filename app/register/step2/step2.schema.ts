// Zod schema + Step2FormData interface

import { z } from "zod";

/* ─── Form data type ─────────────────────────────────────────────── */
// Defined as a plain interface -single source of truth for the form shape.
// zodResolver infers from this directly, avoiding Zod input/output conflicts.
export interface Step2FormData {
  userCategory: string;
  dreamJob: string;
  industries: string[];
  skills: string[];
  experienceYears: string;
  currentRole: string;
}

/* ─── Zod validation schema ──────────────────────────────────────── */
export const step2Schema = z.object({
  userCategory: z.string().min(1, "Please select your category"),
  dreamJob: z.string().min(2, "Please enter your dream job").max(100),
  industries: z.array(z.string()),
  skills: z.array(z.string()),
  experienceYears: z.string(),
  currentRole: z.string(),
}) satisfies z.ZodType<Step2FormData>;

/* ─── Default form values ────────────────────────────────────────── */
export const step2DefaultValues: Step2FormData = {
  userCategory: "",
  dreamJob: "",
  industries: [],
  skills: [],
  experienceYears: "",
  currentRole: "",
};
