// components/resume/PillList.tsx

/**
 * Tag cloud of short strings.
 * The analysis page renders six of these (missing skills, priority skills,
 * keywords, learning, roles, certifications) - they only differed by colour.
 */
export type PillTone = "accent" | "warning" | "success" | "secondary" | "muted";

const toneStyles: Record<PillTone, string> = {
  accent: "text-brand-accent bg-brand-bg",
  warning: "text-brand-warning bg-brand-warning/10",
  success: "text-brand-success bg-brand-success/10",
  secondary: "text-brand-secondary bg-brand-bg",
  muted: "text-brand-accent-lt bg-brand-bg",
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
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${toneStyles[tone]}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
