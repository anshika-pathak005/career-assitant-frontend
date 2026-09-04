// components/roadmap/SkillBlock.tsx

import { CheckCircle2, Circle } from "lucide-react";
import ProgressBar from "./ProgressBar";
import SkillResources from "./SkillResources";
import { getSkillLevelLabel } from "@/constants/roadmap.constants";
import { countSkillSteps, toPercent } from "@/utils/roadmapProgress";
import type { RoadmapSkill } from "@/types/roadmap.types";

interface Props {
  skill: RoadmapSkill;
  onStepToggle: (stepId: number, completed: boolean) => void;
  isUpdating: boolean;
}

/** One skill inside an expanded phase: header, progress, resources, step checklist. */
export default function SkillBlock({ skill, onStepToggle, isUpdating }: Props) {
  const { total, completed } = countSkillSteps([skill]);
  const skillProgress = toPercent(completed, total);

  return (
    <div className="bg-brand-bg/20 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-brand-primary">
              {skill.skillName}
            </h4>
            {skill.skillType && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-accent-lt/20 text-brand-muted">
                {skill.skillType}
              </span>
            )}
          </div>
          <p className="text-xs text-brand-muted mt-0.5">
            {skill.estimatedDays} days
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-brand-muted">Target level</span>
          <p className="text-sm font-semibold text-brand-accent">
            {getSkillLevelLabel(skill.targetLevel)}
          </p>
        </div>
      </div>

      {total > 0 && (
        <div className="mb-3">
          <ProgressBar progress={skillProgress} label="Skill Progress" />
        </div>
      )}

      <SkillResources resources={skill.resources} />

      {/* Steps with Checkboxes */}
      <div>
        <p className="text-xs font-semibold text-brand-secondary mb-2">
          Steps to Complete
        </p>
        <div className="space-y-2">
          {skill.steps?.map((step) => (
            <div key={step.stepId} className="flex items-start gap-2.5 group">
              <button
                type="button"
                onClick={() => onStepToggle(step.stepId, !step.completed)}
                disabled={isUpdating}
                className="mt-0.5 focus:outline-none"
                aria-label={
                  step.completed ? "Mark as incomplete" : "Mark as complete"
                }
              >
                {step.completed ? (
                  <CheckCircle2
                    size={16}
                    className="text-brand-success hover:text-brand-success/70 transition-colors"
                  />
                ) : (
                  <Circle
                    size={16}
                    className="text-brand-accent-lt hover:text-brand-accent transition-colors"
                  />
                )}
              </button>
              <div className="flex-1">
                <p
                  className={`text-sm ${step.completed ? "text-brand-muted line-through" : "text-brand-primary"}`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-brand-accent-lt mt-0.5">
                  {step.estimatedHours} hours
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
