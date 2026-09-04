// components/profile/EditableField.tsx

import EditableRow from "./EditableRow";

const inputClass =
  "w-full rounded-md border border-brand-accent-lt/60 bg-white px-3.5 py-2 text-sm text-brand-primary focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all";

/** Free-text profile field (single line or textarea). */
export default function EditableField({
  label,
  value,
  onSave,
  type = "text",
  multiline = false,
}: {
  label: string;
  value: string;
  onSave: (newValue: string) => void;
  type?: string;
  multiline?: boolean;
}) {
  return (
    <EditableRow<string>
      label={label}
      display={value}
      value={value}
      onSave={(next) => onSave(next.trim())}
    >
      {(draft, setDraft) =>
        multiline ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className={`${inputClass} resize-none`}
            rows={3}
          />
        ) : (
          <input
            type={type}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className={inputClass}
          />
        )
      }
    </EditableRow>
  );
}
