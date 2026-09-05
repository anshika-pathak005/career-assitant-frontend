// components/roadmap/generate/SkillLevelsSection.tsx

"use client";

import Card from "@/components/ui/Card";
import { SKILL_LEVELS } from "@/constants/roadmap.constants";
import type { SkillLevelItem } from "@/app/roadmap/generate/generate.schema";
import OptionCardGroup from "./OptionCardGroup";

interface SkillLevelsSectionProps {
  skillLevels: SkillLevelItem[];
  updateSkillLevel: (skillName: string, level: string) => void;
}

/** Lets the user rate their proficiency for each skill they listed. */
export default function SkillLevelsSection({
  skillLevels,
  updateSkillLevel,
}: SkillLevelsSectionProps) {
  if (skillLevels.length === 0) return null;

  return (
    <Card variant="default" padding="lg">
      <h2 className="card-title mb-4">
        Rate Your Skills
      </h2>
      <p className="text-xs text-brand-muted mb-4">
        Select your proficiency level for each skill
      </p>

      <div className="space-y-3">
        {skillLevels.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg bg-brand-bg/20"
          >
            <span className="text-sm font-medium text-brand-primary w-32">
              {skill.name}
            </span>
            <OptionCardGroup
              variant="pill"
              options={SKILL_LEVELS}
              value={skill.level}
              onChange={(value) => updateSkillLevel(skill.name, value)}
              containerClassName="flex gap-2 flex-wrap"
              optionClassName="px-3 py-1 rounded-full text-xs"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
