// components/profile/SelectField.tsx

import type { LucideIcon } from "lucide-react";
import EditableRow from "./EditableRow";

interface Option {
  value: string;
  label: string;
  desc?: string;
  icon?: LucideIcon;
}

/** Profile field backed by a fixed list of option cards. */
export default function SelectField({
  label,
  value,
  options,
  onSave,
}: {
  label: string;
  value: string;
  options: readonly Option[];
  onSave: (newValue: string) => void;
}) {
  const display = options.find((o) => o.value === value)?.label || value;

  return (
    <EditableRow<string>
      label={label}
      display={display}
      value={value}
      onSave={onSave}
    >
      {(draft, setDraft) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = draft === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setDraft(option.value)}
                className={`flex items-start gap-2 p-2.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? "bg-brand-primary border-brand-primary"
                    : "bg-white border-brand-accent-lt/30 hover:border-brand-accent"
                }`}
              >
                {Icon && (
                  <Icon
                    size={14}
                    className={isSelected ? "text-white" : "text-brand-accent"}
                  />
                )}
                <div className="flex-1">
                  <p
                    className={`text-xs font-semibold ${isSelected ? "text-white" : "text-brand-primary"}`}
                  >
                    {option.label}
                  </p>
                  {option.desc && (
                    <p
                      className={`text-2xs ${isSelected ? "text-white/70" : "text-brand-muted"}`}
                    >
                      {option.desc}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </EditableRow>
  );
}
