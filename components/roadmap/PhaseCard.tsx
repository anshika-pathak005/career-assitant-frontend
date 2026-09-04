// components/roadmap/PhaseCard.tsx

"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Card from "@/components/ui/Card";
import ProgressBar from "./ProgressBar";
import SkillBlock from "./SkillBlock";
import { countSkillSteps, toPercent } from "@/utils/roadmapProgress";
import type { RoadmapPhase } from "@/types/roadmap.types";

interface Props {
  phase: RoadmapPhase;
  onStepToggle: (stepId: number, completed: boolean) => void;
  isUpdating: boolean;
}

/** Collapsible phase. Progress is derived from its skills' steps. */
export default function PhaseCard({ phase, onStepToggle, isUpdating }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { total, completed } = countSkillSteps(phase.skills);
  const phaseProgress = toPercent(completed, total);

  return (
    <Card variant="default" padding="none" className="overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-brand-bg/20 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {phase.phaseOrder}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-brand-primary">{phase.title}</h3>
            <p className="text-xs text-brand-muted mt-0.5">
              {phase.estimatedWeeks} weeks • {phase.skills?.length || 0} skills
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-24">
              <ProgressBar progress={phaseProgress} />
            </div>
            <span className="text-xs font-semibold text-brand-accent min-w-[35px]">
              {phaseProgress}%
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp size={18} className="text-brand-muted" />
          ) : (
            <ChevronDown size={18} className="text-brand-muted" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 pt-2 border-t border-brand-accent-lt/15">
          <p className="text-sm text-brand-muted mb-4">{phase.description}</p>

          <div className="space-y-4">
            {phase.skills?.map((skill) => (
              <SkillBlock
                key={skill.skillId}
                skill={skill}
                onStepToggle={onStepToggle}
                isUpdating={isUpdating}
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
