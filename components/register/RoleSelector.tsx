// components/register/RoleSelector.tsx

import SectionTitle from "./SectionTitle";
import { ROLES } from "@/app/register/step2/step2.constants";

interface Props {
  value?: string;
  onChange: (id: string) => void;
  error?: string;
}

/** Three large role cards: student / fresher / working professional. */
export default function RoleSelector({ value, onChange, error }: Props) {
  return (
    <div className="animate-fade-up delay-2">
      <SectionTitle>Where are you right now?</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {ROLES.map((r) => {
          const isSelected = value === r.id;
          return (
            <button
              key={r.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(r.id)}
              className={`text-left p-4 rounded-lg border transition-all duration-150 ${
                isSelected
                  ? "bg-brand-primary border-brand-primary"
                  : "bg-white border-brand-accent-lt/30 hover:border-brand-accent hover:bg-brand-bg/40"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-md flex items-center justify-center mb-3 ${isSelected ? "bg-white/15" : "bg-brand-bg"}`}
              >
                <r.icon
                  size={18}
                  className={isSelected ? "text-white" : "text-brand-accent"}
                />
              </div>
              <div
                className={`font-bold text-sm mb-0.5 ${isSelected ? "text-white" : "text-brand-primary"}`}
              >
                {r.label}
              </div>
              <div
                className={`text-xs mb-1 ${isSelected ? "text-white/70" : "text-brand-muted"}`}
              >
                {r.sub}
              </div>
              <div
                className={`text-xs ${isSelected ? "text-white/60" : "text-brand-accent-lt"}`}
              >
                {r.desc}
              </div>
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
