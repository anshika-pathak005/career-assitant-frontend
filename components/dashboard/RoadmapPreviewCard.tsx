import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";

interface Props {
  steps: string[];
  resumeId: number;
}

export default function RoadmapPreviewCard({ steps, resumeId }: Props) {
  const preview = steps.slice(0, 3);

  return (
    <div className="bg-white rounded-xl border border-brand-accent-lt/20 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold text-brand-primary text-sm">Learning Roadmap</p>
        <Link
          href={`/analysis?resumeId=${resumeId}`}
          className="text-xs font-bold text-brand-accent hover:text-brand-secondary flex items-center gap-1 transition-colors"
        >
          Full plan <ArrowRight size={12} />
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {preview.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {i === 0 ? (
                <CheckCircle2 size={16} className="text-brand-success" />
              ) : (
                <Circle size={16} className="text-brand-accent-lt" />
              )}
            </div>
            {/* Connector line */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-xs leading-relaxed ${
                  i === 0 ? "font-semibold text-brand-primary" : "text-brand-muted"
                }`}
              >
                {step}
              </p>
            </div>
          </div>
        ))}

        {steps.length > 3 && (
          <p className="text-xs text-brand-muted pl-7">
            +{steps.length - 3} more steps in the full roadmap
          </p>
        )}
      </div>
    </div>
  );
}
