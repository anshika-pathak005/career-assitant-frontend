// components/profile/NumberChoiceField.tsx

import EditableRow from "./EditableRow";

interface Props {
  label: string;
  value: number | null;
  options: readonly { value: number; label: string }[];
  onSave: (value: number) => void;
  /** How the committed value reads in the collapsed row. */
  formatDisplay: (value: number) => string;
  /** How each button reads while editing. */
  formatOption?: (option: { value: number; label: string }) => string;
  columns?: string;
}

/**
 * Numeric field rendered as a grid of buttons.
 * Experience years and weekly hours were two near-identical components;
 * they now differ only by the props above.
 */
export default function NumberChoiceField({
  label,
  value,
  options,
  onSave,
  formatDisplay,
  formatOption = (option) => option.label,
  columns = "grid-cols-3",
}: Props) {
  return (
    <EditableRow<number | null>
      label={label}
      display={value !== null && value !== undefined ? formatDisplay(value) : ""}
      value={value}
      onSave={(next) => {
        if (next !== null) onSave(next);
      }}
    >
      {(draft, setDraft) => (
        <div className={`grid ${columns} gap-2`}>
          {options.map((option) => {
            const isSelected = draft === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setDraft(option.value)}
                className={`px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-brand-primary text-white"
                    : "bg-white border border-brand-accent-lt/30 text-brand-muted hover:border-brand-accent"
                }`}
              >
                {formatOption(option)}
              </button>
            );
          })}
        </div>
      )}
    </EditableRow>
  );
}
