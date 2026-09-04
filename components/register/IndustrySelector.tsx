// components/register/IndustrySelector.tsx

import SectionTitle from "./SectionTitle";
import { INDUSTRIES } from "@/app/register/step2/step2.constants";

interface Props {
  selected: string[];
  onToggle: (industry: string) => void;
}

/** Multi-select checkbox grid of industries. */
export default function IndustrySelector({ selected, onToggle }: Props) {
  return (
    <div className="animate-fade-up delay-4">
      <SectionTitle optional>Industries of Interest</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {INDUSTRIES.map((ind) => {
          const isSelected = selected.includes(ind);
          return (
            <button
              key={ind}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggle(ind)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md border text-left text-xs font-medium transition-all duration-150 ${
                isSelected
                  ? "bg-brand-primary border-brand-primary text-white"
                  : "bg-white border-brand-accent-lt/30 text-brand-muted hover:border-brand-accent hover:text-brand-secondary"
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-sm flex-shrink-0 border flex items-center justify-center transition-colors"
                style={{
                  background: isSelected ? "#fff" : "transparent",
                  borderColor: isSelected ? "#fff" : "currentColor",
                }}
              >
                {isSelected && (
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000F22"
                    strokeWidth="3.5"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </span>
              {ind}
            </button>
          );
        })}
      </div>
    </div>
  );
}
