// components/profile/EditableRow.tsx

"use client";

import { useState, type ReactNode } from "react";
import { Edit2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface Props<T> {
  label: string;
  /** Text shown when not editing. */
  display: string;
  /** Current committed value; also the starting point for a fresh edit. */
  value: T;
  onSave: (next: T) => void;
  /** Editor UI. Receives the in-progress draft and a setter for it. */
  children: (draft: T, setDraft: (next: T) => void) => ReactNode;
  saveLabel?: string;
}

/**
 * Shared read/edit shell for every profile field.
 * All six field types used to repeat this isEditing + row + Save/Cancel
 * block; now they only supply their own editor.
 */
export default function EditableRow<T>({
  label,
  display,
  value,
  onSave,
  children,
  saveLabel = "Save",
}: Props<T>) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<T>(value);

  const startEditing = () => {
    setDraft(value); // always edit from the latest committed value
    setIsEditing(true);
  };

  const handleSave = () => {
    if (draft !== value) onSave(draft);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-3">
        {children(draft, setDraft)}
        <div className="flex gap-2">
          <Button size="sm" variant="primary" onClick={handleSave}>
            {saveLabel}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 bg-brand-bg/20 rounded-lg group">
      <div>
        <p className="text-xs text-brand-muted mb-0.5">{label}</p>
        <p className="text-sm font-medium text-brand-primary">
          {display || "Not specified"}
        </p>
      </div>
      <button
        onClick={startEditing}
        aria-label={`Edit ${label}`}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-muted hover:text-brand-accent"
      >
        <Edit2 size={14} />
      </button>
    </div>
  );
}
