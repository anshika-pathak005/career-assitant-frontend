// components/roadmap/generate/ProfileInfoSection.tsx

"use client";

import { useFormContext } from "react-hook-form";
import { Plus, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import {
  INDUSTRIES_LIST,
  WORK_PREFERENCE_OPTIONS,
} from "@/constants/roadmap.constants";
import type { UserProfile } from "@/types/profile.types";
import type { FormData } from "@/app/roadmap/generate/generate.schema";
import OptionCardGroup from "./OptionCardGroup";

interface ProfileInfoSectionProps {
  profile?: UserProfile;
  selectedIndustries: string[];
  toggleIndustry: (industry: string) => void;
  selectedSkills: string[];
  newSkill: string;
  setNewSkill: (value: string) => void;
  addSkill: () => void;
  removeSkill: (skill: string) => void;
}

/** Fields carried over from the user's profile, editable for this run. */
export default function ProfileInfoSection({
  profile,
  selectedIndustries,
  toggleIndustry,
  selectedSkills,
  newSkill,
  setNewSkill,
  addSkill,
  removeSkill,
}: ProfileInfoSectionProps) {
  const { register, watch, setValue } = useFormContext<FormData>();
  const workPreference = watch("workPreference");

  const fromProfileBadge = (text: string) => (
    <span className="text-2xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shadow-sm">
      {text}
    </span>
  );

  return (
    <Card variant="default" padding="lg">
      <h2 className="card-title mb-4">
        Professional Background
      </h2>

      <div className="space-y-4">
        <Input
          label={
            profile?.currentRole
              ? "Current Role (from profile ✓)"
              : "Current Role"
          }
          placeholder="e.g., Software Engineer Intern"
          {...register("currentRole")}
        />

        {/* Industries — multi-select */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="field-label">
              Industries of Interest
            </label>
            {profile?.industries &&
              profile.industries.length > 0 &&
              fromProfileBadge(
                `${profile.industries.length} industries from profile`,
              )}
          </div>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES_LIST.map((industry) => (
              <button
                key={industry}
                type="button"
                aria-pressed={selectedIndustries.includes(industry)}
                onClick={() => toggleIndustry(industry)}
                className={`px-3 py-1 rounded-full border text-xs font-semibold shadow-sm transition-all duration-150 ${
                  selectedIndustries.includes(industry)
                    ? "bg-brand-primary border-brand-primary text-white"
                    : "bg-brand-bg/60 border-brand-accent-lt/35 text-brand-secondary hover:border-brand-accent"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="field-label">
              Skills
            </label>
            {profile?.skills &&
              profile.skills.length > 0 &&
              fromProfileBadge(
                `${profile.skills.length} skills loaded from profile`,
              )}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 bg-brand-primary text-white text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {skill}
                <button
                  type="button"
                  aria-label={`Remove ${skill}`}
                  onClick={() => removeSkill(skill)}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Type a skill and press Enter"
              className="flex-1 h-11 rounded-md border border-brand-accent-lt/60 bg-white px-3.5 text-sm text-brand-primary placeholder:text-brand-accent-lt focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={addSkill}
              aria-label="Add skill"
            >
              <Plus size={14} />
            </Button>
          </div>
        </div>

        {/* Work preference */}
        <OptionCardGroup
          label="Work Preference"
          labelAccessory={
            profile?.workPreference ? fromProfileBadge("Saved preference") : undefined
          }
          variant="pill"
          options={WORK_PREFERENCE_OPTIONS}
          value={workPreference}
          onChange={(value) => setValue("workPreference", value)}
          containerClassName="flex gap-3"
          optionClassName="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm"
        />
      </div>
    </Card>
  );
}
