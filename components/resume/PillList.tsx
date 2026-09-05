// components/resume/PillList.tsx

/**
 * Tag cloud of short strings.
 * The analysis page renders six of these (missing skills, priority skills,
 * keywords, learning, roles, certifications) - they only differed by colour.
 */
export type PillTone = "accent" | "warning" | "success" | "secondary" | "muted";

const toneStyles: Record<PillTone, string> = {
  accent: "text-brand-secondary bg-brand-bg/70 border-brand-accent-lt/35 hover:border-brand-accent",
  warning: "text-amber-800 bg-amber-50/90 border-amber-200 hover:border-amber-400",
  success: "text-emerald-800 bg-emerald-50/90 border-emerald-200 hover:border-emerald-400",
  secondary: "text-brand-primary bg-white border-brand-accent-lt/40 hover:border-brand-accent",
  muted: "text-brand-muted bg-brand-bg/40 border-brand-accent-lt/25 hover:border-brand-accent-lt",
};

export default function PillList({
  items,
  tone = "accent",
}: {
  items: string[];
  tone?: PillTone;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, idx) => (
        <span
          key={idx}
          className={`text-xs font-semibold px-3 py-1 rounded-full border shadow-sm transition-all duration-150 ${toneStyles[tone]}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
