// components/resume/ScoreRing.tsx

interface Props {
  value: number;
  label: string;
  color: string;
  /** "lg" on the detail page, "sm" in the history list. */
  size?: "sm" | "lg";
}

const sizes = {
  sm: { box: "w-12 h-12", radius: 20, stroke: 4, viewBox: 50, value: "text-sm", label: "text-[10px]" },
  lg: { box: "w-20 h-20", radius: 35, stroke: 6, viewBox: 85, value: "text-xl", label: "text-xs" },
} as const;

/** Circular 0-100 score gauge. Colour is passed in by the caller. */
export default function ScoreRing({ value, label, color, size = "lg" }: Props) {
  const s = sizes[size];
  const center = s.viewBox / 2;
  const circumference = 2 * Math.PI * s.radius;
  const progress = ((100 - value) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`relative ${s.box}`}>
        <svg
          className="w-full h-full -rotate-90"
          viewBox={`0 0 ${s.viewBox} ${s.viewBox}`}
        >
          <circle
            cx={center}
            cy={center}
            r={s.radius}
            fill="none"
            stroke="#C2E8FF"
            strokeWidth={s.stroke}
          />
          <circle
            cx={center}
            cy={center}
            r={s.radius}
            fill="none"
            stroke={color}
            strokeWidth={s.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            className="transition-all duration-1000"
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center font-bold ${s.value}`}
          style={{ color }}
        >
          {value}
        </span>
      </div>
      <span className={`font-medium text-brand-muted ${s.label}`}>{label}</span>
    </div>
  );
}
