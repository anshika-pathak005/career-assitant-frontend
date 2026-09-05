// components/roadmap/generate/PreferencesSection.tsx

"use client";

import { useFormContext } from "react-hook-form";
import Card from "@/components/ui/Card";
import {
  ROADMAP_GOAL_TYPES,
  LEARNING_STYLES,
  PROJECT_LEVEL_OPTIONS,
  WEEKLY_HOURS_OPTIONS,
  EXPERIENCE_OPTIONS,
} from "@/constants/roadmap.constants";
import type { FormData } from "@/app/roadmap/generate/generate.schema";
import OptionCardGroup from "./OptionCardGroup";

/**
 * The five single-select preference fields that shape the generated
 * roadmap. Every one of them is the same interaction, so they are all
 * the same component with different layout props.
 */
export default function PreferencesSection() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <Card variant="default" padding="lg">
      <h2 className="card-title mb-4">
        Learning Preferences
      </h2>

      <div className="space-y-5">
        <OptionCardGroup
          label="Experience Years"
          variant="pill"
          options={EXPERIENCE_OPTIONS}
          value={watch("experienceYears")}
          onChange={(value) => setValue("experienceYears", value)}
          containerClassName="grid grid-cols-3 gap-2"
          optionClassName="px-3 py-2 rounded-md text-xs"
          error={errors.experienceYears?.message}
          errorFieldName="Experience level"
        />

        <OptionCardGroup
          label="Career Goal"
          options={ROADMAP_GOAL_TYPES}
          value={watch("goalType")}
          onChange={(value) => setValue("goalType", value)}
          containerClassName="grid grid-cols-1 sm:grid-cols-2 gap-3"
          error={errors.goalType?.message}
          errorFieldName="Career goal"
        />

        <OptionCardGroup
          label="Project Experience Level"
          options={PROJECT_LEVEL_OPTIONS}
          align="center"
          value={watch("projectLevel")}
          onChange={(value) => setValue("projectLevel", value)}
          containerClassName="grid grid-cols-1 sm:grid-cols-3 gap-3"
          error={errors.projectLevel?.message}
          errorFieldName="Project level"
        />

        <OptionCardGroup
          label="Learning Style"
          options={LEARNING_STYLES}
          value={watch("learningStyle")}
          onChange={(value) => setValue("learningStyle", value)}
          containerClassName="grid grid-cols-1 sm:grid-cols-2 gap-3"
          error={errors.learningStyle?.message}
          errorFieldName="Learning style"
        />

        <OptionCardGroup
          label="Weekly Study Hours"
          variant="pill"
          options={WEEKLY_HOURS_OPTIONS.map((hours) => ({
            value: hours.value,
            label: `${hours.value}h`,
          }))}
          value={watch("weeklyHours")}
          onChange={(value) => setValue("weeklyHours", value)}
          containerClassName="grid grid-cols-3 sm:grid-cols-6 gap-2"
          optionClassName="py-2 rounded-md text-sm"
          error={errors.weeklyHours?.message}
          errorFieldName="Weekly hours"
        />
      </div>
    </Card>
  );
}
