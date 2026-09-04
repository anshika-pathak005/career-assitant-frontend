// components/profile/IndustriesSection.tsx

"use client";

import TagSection from "./TagSection";
import { INDUSTRIES_LIST } from "@/constants/roadmap.constants";

/** Multi-select over a fixed industry list. */
export default function IndustriesSection({
  industries,
  onUpdate,
}: {
  industries: string[];
  onUpdate: (industries: string[]) => void;
}) {
  return (
    <TagSection
      label="Industries"
      items={industries}
      emptyText="No industries selected"
      saveLabel="Save Industries"
      onSave={onUpdate}
    >
      {(draft, setDraft) => (
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
          {INDUSTRIES_LIST.map((industry) => {
            const isSelected = draft.includes(industry);
            return (
              <button
                key={industry}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  setDraft(
                    isSelected
                      ? draft.filter((i) => i !== industry)
                      : [...draft, industry],
                  )
                }
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-brand-primary text-white"
                    : "bg-brand-bg text-brand-muted hover:bg-brand-accent hover:text-white"
                }`}
              >
                {industry}
              </button>
            );
          })}
        </div>
      )}
    </TagSection>
  );
}
