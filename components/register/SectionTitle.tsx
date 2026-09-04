// components/register/SectionTitle.tsx

import type { ReactNode } from "react";

/** Small heading above each form section, with an optional "optional" badge. */
export default function SectionTitle({
  children,
  optional,
}: {
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <p className="text-sm font-semibold text-brand-secondary">{children}</p>
      {optional && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted bg-brand-bg px-2 py-0.5 rounded-full">
          optional
        </span>
      )}
    </div>
  );
}
