// components/resume/SectionHeader.tsx

import type { LucideIcon } from "lucide-react";

/** Icon + title (+ optional description) used at the top of every analysis card. */
export default function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-brand-bg flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-brand-accent" />
      </div>
      <div>
        <h2 className="card-title">{title}</h2>
        {description && (
          <p className="card-subtitle">{description}</p>
        )}
      </div>
    </div>
  );
}
