// components/profile/LearningPreferencesCard.tsx

import { Sparkles } from "lucide-react";
import Card from "@/components/ui/Card";
import SelectField from "./SelectField";
import NumberChoiceField from "./NumberChoiceField";
import { getExperienceLabel } from "@/utils/profileLabels";
import {
  ROADMAP_GOAL_TYPES,
  LEARNING_STYLES,
  PROJECT_LEVEL_OPTIONS,
  WORK_PREFERENCE_OPTIONS,
  WEEKLY_HOURS_OPTIONS,
  EXPERIENCE_OPTIONS,
} from "@/constants/roadmap.constants";
import type { UserProfile, ProfileUpdateRequest } from "@/types/profile.types";

interface Props {
  profile: UserProfile;
  onUpdate: (patch: ProfileUpdateRequest) => void;
}

/** Experience, goal, level, style, work preference and weekly hours. */
export default function LearningPreferencesCard({ profile, onUpdate }: Props) {
  const selects = [
    {
      label: "Career Goal",
      key: "goalType" as const,
      value: profile.goalType,
      options: ROADMAP_GOAL_TYPES,
    },
    {
      label: "Project Experience Level",
      key: "projectLevel" as const,
      value: profile.projectLevel,
      options: PROJECT_LEVEL_OPTIONS,
    },
    {
      label: "Learning Style",
      key: "learningStyle" as const,
      value: profile.learningStyle,
      options: LEARNING_STYLES,
    },
    {
      label: "Work Preference",
      key: "workPreference" as const,
      value: profile.workPreference,
      options: WORK_PREFERENCE_OPTIONS,
    },
  ];

  return (
    <Card variant="default" padding="lg" className="mb-6">
      <h3 className="card-heading mb-4 flex items-center gap-2">
        <Sparkles size={16} className="text-brand-accent" />
        Learning Preferences
      </h3>
      <div className="space-y-3">
        <NumberChoiceField
          label="Experience Years"
          value={profile.experienceYears}
          options={EXPERIENCE_OPTIONS}
          onSave={(val) => onUpdate({ experienceYears: val })}
          formatDisplay={getExperienceLabel}
        />

        {selects.map((field) => (
          <SelectField
            key={field.key}
            label={field.label}
            value={field.value || ""}
            options={field.options}
            onSave={(val) => onUpdate({ [field.key]: val })}
          />
        ))}

        <NumberChoiceField
          label="Weekly Study Hours"
          value={profile.weeklyHours}
          options={WEEKLY_HOURS_OPTIONS}
          onSave={(val) => onUpdate({ weeklyHours: val })}
          formatDisplay={(val) => `${val} hours/week`}
          formatOption={(option) => `${option.value}h`}
          columns="grid-cols-3 sm:grid-cols-6"
        />
      </div>
    </Card>
  );
}
