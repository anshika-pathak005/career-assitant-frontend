// constants/roadmap.constants.ts
// All constants for roadmap generation form

import {
  Target,
  Rocket,
  TrendingUp,
  Lightbulb,
  BookOpen,
  Code2,
  Wrench,
  Zap,
  Coffee,
  Dumbbell,
  Brain,
  GraduationCap,
  Award,
  Globe,
  Building2,
  Home,
  Clock,
  Calendar,
} from "lucide-react";

/* ─── Goal type options ─────────────────────────────────────────────── */
export const ROADMAP_GOAL_TYPES = [
  {
    value: "GET_JOB",
    label: "Get a Job",
    desc: "Land a full-time role in your dream company",
    icon: Target,
  },
  {
    value: "IMPROVE_SKILLS",
    label: "Improve Skills",
    desc: "Level up your existing tech stack",
    icon: TrendingUp,
  },
  {
    value: "BUILD_PROJECTS",
    label: "Build Projects",
    desc: "Create impressive projects to showcase",
    icon: Code2,
  },
  {
    value: "INTERVIEW_PREP",
    label: "Interview Prep",
    desc: "Crack coding interviews and system design",
    icon: Rocket,
  },
  {
    value: "EXPLORE",
    label: "Explore",
    desc: "Discover new technologies and domains",
    icon: Lightbulb,
  },
] as const;

/* ─── Learning style options ───────────────────────────────────────── */
export const LEARNING_STYLES = [
  {
    value: "PROJECT_FIRST",
    label: "Project First",
    sub: "Learn by building",
    desc: "Start with projects, learn concepts along the way",
    icon: Rocket,
  },
  {
    value: "THEORY_FIRST",
    label: "Theory First",
    sub: "Learn concepts then practice",
    desc: "Master fundamentals before applying them",
    icon: BookOpen,
  },
  {
    value: "BALANCED",
    label: "Balanced",
    sub: "Concept plus immediate apply",
    desc: "Mix of theory and hands-on practice",
    icon: Brain,
  },
  {
    value: "GUIDED",
    label: "Guided",
    sub: "Highly structured step by step",
    desc: "Follow a curated, structured path",
    icon: Wrench,
  },
] as const;

/* ─── Project level options ────────────────────────────────────────── */
export const PROJECT_LEVEL_OPTIONS = [
  {
    value: "BEGINNER",
    label: "Beginner",
    sub: "Simple and guided projects",
    desc: "Follow along with tutorials and starter projects",
    icon: Coffee,
  },
  {
    value: "INTERMEDIATE",
    label: "Intermediate",
    sub: "Moderate with independence",
    desc: "Build personal projects with minimal guidance",
    icon: Dumbbell,
  },
  {
    value: "ADVANCED",
    label: "Advanced",
    sub: "Complex real-world projects",
    desc: "Production-grade applications with best practices",
    icon: Zap,
  },
] as const;

/* ─── Skill level options ──────────────────────────────────────────── */
export const SKILL_LEVELS = [
  {
    value: "BEGINNER",
    label: "Beginner",
    sub: "Just starting out",
    desc: "Know the basics, still learning syntax",
    icon: GraduationCap,
  },
  {
    value: "INTERMEDIATE",
    label: "Intermediate",
    sub: "Building projects",
    desc: "Comfortable, can build small applications",
    icon: Wrench,
  },
  {
    value: "ADVANCED",
    label: "Advanced",
    sub: "Comfortable with real work",
    desc: "Confident, can work on production code",
    icon: Award,
  },
  {
    value: "EXPERT",
    label: "Expert",
    sub: "Deep knowledge",
    desc: "Mastery, can mentor others",
    icon: Brain,
  },
] as const;

/* ─── Work preference options ──────────────────────────────────────── */
export const WORK_PREFERENCE_OPTIONS = [
  { value: "REMOTE", label: "Remote", icon: Globe },
  { value: "ONSITE", label: "On-site", icon: Building2 },
  { value: "HYBRID", label: "Hybrid", icon: Home },
] as const;

/* ─── Weekly hours options ─────────────────────────────────────────── */
export const WEEKLY_HOURS_OPTIONS = [
  { value: 5, label: "5 hours", icon: Coffee },
  { value: 10, label: "10 hours", icon: Clock },
  { value: 15, label: "15 hours", icon: Calendar },
  { value: 20, label: "20 hours", icon: Zap },
  { value: 25, label: "25 hours", icon: Dumbbell },
  { value: 30, label: "30 hours", icon: Rocket },
] as const;

/* ─── Industry options ─────────────────────────────────────────────── */
export const INDUSTRIES_LIST = [
  "Technology & Software",
  "Data Science & AI",
  "Banking & Finance",
  "Marketing & Advertising",
  "Healthcare & Pharma",
  "Design & Creative",
  "Education & Teaching",
  "Sales & Business Development",
  "Consulting",
  "Operations & Supply Chain",
  "Startup / Entrepreneurship",
  "E-commerce & Retail",
  "Media & Entertainment",
  "Government & Public Sector",
  "Cybersecurity",
  "Cloud & DevOps",
] as const;

/* ─── Experience options ───────────────────────────────────────────── */
export const EXPERIENCE_OPTIONS = [
  { value: 0, label: "0 years" },
  { value: 1, label: "1 year" },
  { value: 2, label: "2 years" },
  { value: 3, label: "3 years" },
  { value: 4, label: "4 years" },
  { value: 5, label: "5+ years" },
] as const;

/* ─── Helper functions ─────────────────────────────────────────────── */
export const getGoalTypeLabel = (value: string): string => {
  return ROADMAP_GOAL_TYPES.find((g) => g.value === value)?.label ?? value;
};

export const getLearningStyleLabel = (value: string): string => {
  return LEARNING_STYLES.find((l) => l.value === value)?.label ?? value;
};

export const getProjectLevelLabel = (value: string): string => {
  return PROJECT_LEVEL_OPTIONS.find((p) => p.value === value)?.label ?? value;
};

export const getSkillLevelLabel = (value: string): string => {
  return SKILL_LEVELS.find((s) => s.value === value)?.label ?? value;
};

export const getWorkPreferenceLabel = (value: string): string => {
  return WORK_PREFERENCE_OPTIONS.find((w) => w.value === value)?.label ?? value;
};
