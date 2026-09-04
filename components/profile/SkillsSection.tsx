// components/profile/SkillsSection.tsx

"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import TagSection from "./TagSection";

/** Free-text skill list: type a skill, press Enter or Add. */
export default function SkillsSection({
  skills,
  onUpdate,
}: {
  skills: string[];
  onUpdate: (skills: string[]) => void;
}) {
  const [skillInput, setSkillInput] = useState("");

  return (
    <TagSection
      label="Skills"
      items={skills}
      emptyText="No skills added yet"
      saveLabel="Save Skills"
      onSave={onUpdate}
    >
      {(draft, setDraft) => {
        const addSkill = () => {
          const value = skillInput.trim();
          if (value && !draft.includes(value)) {
            setDraft([...draft, value]);
            setSkillInput("");
          }
        };

        return (
          <>
            <div className="flex flex-wrap gap-2 mb-2">
              {draft.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 bg-brand-primary text-white text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {skill}
                  <button
                    type="button"
                    aria-label={`Remove ${skill}`}
                    onClick={() => setDraft(draft.filter((s) => s !== skill))}
                    className="opacity-60 hover:opacity-100"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // Stop Enter from bubbling up and submitting any parent form
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Type a skill and press Enter"
                className="flex-1 h-10 rounded-md border border-brand-accent-lt/60 bg-white px-3 text-sm text-brand-primary placeholder:text-brand-accent-lt focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
              />
              <Button size="sm" variant="secondary" onClick={addSkill}>
                Add
              </Button>
            </div>
          </>
        );
      }}
    </TagSection>
  );
}
