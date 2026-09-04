// components/register/ExperienceSelector.tsx

import SectionTitle from "./SectionTitle";
import { EXPERIENCE_OPTIONS } from "@/app/register/step2/step2.constants";

interface Props {
  value?: string;
  onSelect: (exp: string) => void;
}

/** Pill row of experience ranges. Clicking the active pill clears it. */
export default function ExperienceSelector({ value, onSelect }: Props) {
  return (
    <div className="animate-fade-up delay-6">
      <SectionTitle optional>Years of Experience</SectionTitle>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {EXPERIENCE_OPTIONS.map((exp) => {
          const isSelected = value === exp;
          return (
            <button
              key={exp}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(exp)}
              className={`px-3 py-2.5 rounded-md border text-xs font-semibold text-center transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "bg-brand-primary border-brand-primary text-white"
                  : "bg-white border-brand-accent-lt/30 text-brand-muted hover:border-brand-accent hover:text-brand-secondary"
              }`}
            >
              {exp}
            </button>
          );
        })}
      </div>
    </div>
  );
}
