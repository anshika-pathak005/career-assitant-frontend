// types/roadmap.types.ts
// Type definitions for roadmap generation and display

/* ─── Enum types (matching backend) ─────────────────────────────── */
export type GoalType =
  | "GET_JOB"
  | "IMPROVE_SKILLS"
  | "BUILD_PROJECTS"
  | "INTERVIEW_PREP"
  | "EXPLORE";
export type LearningStyle =
  | "PROJECT_FIRST"
  | "THEORY_FIRST"
  | "BALANCED"
  | "GUIDED";
export type ProjectLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
export type WorkPreference = "REMOTE" | "ONSITE" | "HYBRID";
export type RoadmapStatus = "ACTIVE" | "COMPLETED" | "ARCHIVED";

/* ─── Specialization ─────────────────────────────────────────────── */
export interface Specialization {
  title: string;
  description: string;
  coreTech: string[];
}

/* ─── Roadmap Generation Request ────────────────────────────────── */
export interface RoadmapGenerationRequest {
  // Editable profile fields (optional - null means keep existing)
  currentRole?: string | null;
  industries?: string[];
  skills?: string[];
  workPreference?: string | null;

  // Required fields for generation
  experienceYears: number | null;
  goalType: string;
  projectLevel: string;
  learningStyle: string;
  weeklyHours: number | null;
  skillLevels: Record<string, string>; // skill name → SkillLevel
  specialization?: string;
}

/* ─── Roadmap Response Types ─────────────────────────────────────── */
export interface RoadmapStep {
  stepId: number;
  title: string;
  description: string;
  stepOrder: number;
  estimatedHours: number;
  completed: boolean;
}

export interface RoadmapSkill {
  skillId: number;
  skillName: string;
  skillOrder: number;
  estimatedDays: number;
  targetLevel: string;
  startingLevel: string;
  isExistingSkill: boolean;
  resources: string; // JSON string array
  steps: RoadmapStep[];
}

export interface RoadmapPhase {
  phaseId: number;
  title: string;
  description: string;
  phaseOrder: number;
  estimatedWeeks: number;
  skills: RoadmapSkill[];
}

export interface Roadmap {
  roadmapId: number;
  dreamJob: string;
  status: RoadmapStatus;
  summary: string;
  totalEstimatedWeeks: number;
  generatedAt: string;
  phases: RoadmapPhase[];
}
