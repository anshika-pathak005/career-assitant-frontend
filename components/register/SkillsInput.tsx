// components/register/SkillsInput.tsx

import { X } from "lucide-react";
import type { KeyboardEvent } from "react";
import SectionTitle from "./SectionTitle";

interface Props {
  selected: string[];
  suggestions: readonly string[];
  hasIndustries: boolean;
  skillInput: string;
  setSkillInput: (value: string) => void;
  onAdd: (skill: string) => void;
  onRemove: (skill: string) => void;
}

/** Tag input for skills, with industry-aware suggestion chips underneath. */
export default function SkillsInput({
  selected,
  suggestions,
  hasIndustries,
  skillInput,
  setSkillInput,
  onAdd,
  onRemove,
}: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Stop Enter from submitting the whole form
      e.preventDefault();
      onAdd(skillInput);
    }
  };

  return (
    <div className="animate-fade-up delay-5">
      <SectionTitle optional>Your Skills</SectionTitle>

      {/* Skill tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selected.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 bg-brand-primary text-white text-xs font-semibold px-3 py-1 rounded-full"
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemove(skill)}
                aria-label={`Remove ${skill}`}
                className="opacity-60 hover:opacity-100 transition-opacity flex items-center"
              >
                <X size={10} strokeWidth={3} />
              </button>
            </span>
          ))}
        </div>
      )}

      <input
        type="text"
        value={skillInput}
        onChange={(e) => setSkillInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter"
        className="w-full h-11 rounded-md border border-brand-accent-lt/60 bg-white px-3.5 text-sm text-brand-primary placeholder:text-brand-accent-lt focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all"
      />

      {/* Industry-aware suggestions */}
      <div className="mt-2.5">
        <p className="text-xs text-brand-muted mb-1.5">
          {hasIndustries
            ? "Suggested for your selected industries:"
            : "Popular skills:"}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onAdd(s)}
              disabled={selected.includes(s)}
              className="text-xs bg-brand-bg text-brand-secondary font-medium px-2.5 py-1 rounded-full border border-brand-accent-lt/30 hover:bg-brand-accent hover:text-white hover:border-brand-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
