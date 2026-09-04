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
    <span className="text-[10px] text-[#16A34A] bg-[#C2E8FF] px-2 py-0.5 rounded-full">
      {text}
    </span>
  );

  return (
    <Card variant="default" padding="lg">
      <h2 className="font-semibold text-[#000F22] text-lg mb-4">
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

        {/* Industries — multi-select, so it doesn't use OptionCardGroup */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-[#042558]">
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
                className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-all duration-150 ${
                  selectedIndustries.includes(industry)
                    ? "bg-[#000F22] border-[#000F22] text-white"
                    : "bg-white border-[#7A9BC4]/30 text-[#537FAF] hover:border-[#557EB2]"
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
            <label className="text-sm font-semibold text-[#042558]">
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
                className="inline-flex items-center gap-1.5 bg-[#000F22] text-white text-xs font-medium px-2.5 py-1 rounded-full"
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
              className="flex-1 h-11 rounded-md border border-[#7A9BC4]/60 bg-white px-3.5 text-sm text-[#000F22] placeholder:text-[#7A9BC4] focus:outline-none focus:border-[#557EB2] focus:ring-2 focus:ring-[#557EB2]/20 transition-all"
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
