// components/ui/HeroBadge.tsx

import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  children: React.ReactNode;
  /** `dark` sits on a dark gradient hero, `light` on the page background. */
  tone?: "dark" | "light";
  className?: string;
}

/**
 * The small pill above a hero heading.
 *
 * Previously the resume hero and the roadmap hero each had their own copy of
 * this markup with different padding, weight and colours, which is why the two
 * pages looked subtly different. One component now, so they cannot drift.
 */
export default function HeroBadge({
  icon: Icon,
  children,
  tone = "dark",
  className = "",
}: Props) {
  const tones = {
    dark: "bg-white/20 border-white/30 text-white",
    light: "bg-brand-bg border-brand-accent-lt/30 text-brand-accent",
  };

  return (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-full border backdrop-blur-md",
        "px-3 py-1 shadow-sm",
        tones[tone],
        className,
      ].join(" ")}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}
