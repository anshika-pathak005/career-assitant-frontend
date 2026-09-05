// components/profile/TagSection.tsx

"use client";

import { useState, type ReactNode } from "react";
import { Edit2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface Props {
  label: string;
  items: string[];
  emptyText: string;
  saveLabel: string;
  onSave: (items: string[]) => void;
  /** Editor UI for the draft list. */
  children: (draft: string[], setDraft: (next: string[]) => void) => ReactNode;
}

/**
 * Read/edit shell for the two multi-value sections (skills, industries).
 * The collapsed pill view is identical for both; only the editor differs.
 */
export default function TagSection({
  label,
  items,
  emptyText,
  saveLabel,
  onSave,
  children,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<string[]>(items);

  const startEditing = () => {
    setDraft(items);
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <div className="space-y-3">
        {children(draft, setDraft)}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              onSave(draft);
              setIsEditing(false);
            }}
          >
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
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="meta-text">{label}</p>
        <button
          onClick={startEditing}
          aria-label={`Edit ${label}`}
          className="tap-target text-brand-muted hover:text-brand-accent transition-colors"
        >
          <Edit2 size={14} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <span
              key={item}
              className="text-xs font-medium text-brand-secondary bg-brand-bg px-2.5 py-1 rounded-full"
            >
              {item}
            </span>
          ))
        ) : (
          <p className="text-sm text-brand-accent-lt">{emptyText}</p>
        )}
      </div>
    </div>
  );
}
