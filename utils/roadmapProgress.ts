// utils/roadmapProgress.ts

import type { RoadmapPhase, RoadmapSkill } from "@/types/roadmap.types";

/** Total + completed step counts for a list of skills. */
export function countSkillSteps(skills: RoadmapSkill[] = []) {
  let total = 0;
  let completed = 0;
  for (const skill of skills) {
    const steps = skill.steps || [];
    total += steps.length;
    completed += steps.filter((s) => s.completed).length;
  }
  return { total, completed };
}

/** Same counts rolled up across every phase of a roadmap. */
export function countRoadmapSteps(phases: RoadmapPhase[] = []) {
  let total = 0;
  let completed = 0;
  for (const phase of phases) {
    const counts = countSkillSteps(phase.skills);
    total += counts.total;
    completed += counts.completed;
  }
  return { total, completed };
}

/** Whole-number percentage, safe when there are no steps yet. */
export function toPercent(completed: number, total: number) {
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}
