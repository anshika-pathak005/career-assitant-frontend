// components/ui/EmptyState.tsx

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

/** Centered "nothing here yet" block used by the list pages. */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: Props) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center mx-auto mb-4">
        <Icon size={24} className="text-brand-accent" />
      </div>
      <h3 className="font-display text-brand-primary text-xl mb-2">{title}</h3>
      <p className="text-sm text-brand-muted max-w-md mx-auto mb-6">
        {description}
      </p>
      {action}
    </div>
  );
}
