// components/resume/BulletList.tsx

import type { LucideIcon } from "lucide-react";

type BulletTone = "accent" | "success" | "warning";

const iconTone: Record<BulletTone, string> = {
  accent: "text-brand-accent",
  success: "text-brand-success",
  warning: "text-brand-warning",
};

/**
 * Vertical list of sentences.
 * Pass an icon for strengths/weaknesses, or leave it out for a plain dot bullet.
 */
export default function BulletList({
  items,
  icon: Icon,
  tone = "accent",
}: {
  items: string[];
  icon?: LucideIcon;
  tone?: BulletTone;
}) {
  return (
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="flex items-start gap-2 text-sm text-brand-muted"
        >
          {Icon ? (
            <Icon
              size={14}
              className={`${iconTone[tone]} flex-shrink-0 mt-0.5`}
            />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 flex-shrink-0" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
