// components/dashboard/ActiveRoadmapCard.tsx

import Link from "next/link";
import { Target, ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import type { RoadmapData } from "@/types/dashboard.types";

/** Summary of the user's active roadmap: overall bar, 3 stat tiles, first 3 phases. */
export default function ActiveRoadmapCard({
  roadmap,
}: {
  roadmap: RoadmapData;
}) {
  const phaseProgress = roadmap.phaseProgress || [];
  const firstThreePhases = phaseProgress.slice(0, 3);

  return (
    <Card variant="default" padding="md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-brand-accent">
            Active Roadmap
          </p>
          <p className="font-semibold text-brand-primary text-sm mt-0.5">
            {roadmap.dreamJob}
          </p>
        </div>
        <Link
          href={`/roadmap/${roadmap.roadmapId}`}
          className="text-xs font-medium text-brand-accent hover:text-brand-secondary flex items-center gap-1 transition-colors"
        >
          View Details <ArrowRight size={12} />
        </Link>
      </div>

      {/* Overall Progress */}
      <div className="mb-4 p-3 bg-brand-bg/30 rounded-lg">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold text-brand-primary">Overall Progress</p>
          <p className="text-xs font-semibold text-brand-accent">{roadmap.overallProgress}%</p>
        </div>
        <div className="h-1.5 bg-brand-bg rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-accent rounded-full transition-all"
            style={{ width: `${roadmap.overallProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-brand-bg/30 rounded-lg p-2.5 text-center">
          <Calendar size={14} className="text-brand-accent mx-auto mb-1" />
          <p className="text-xs font-semibold text-brand-primary">
            {roadmap.totalEstimatedWeeks} weeks
          </p>
          <p className="text-[10px] text-brand-muted">Total duration</p>
        </div>
        <div className="bg-brand-bg/30 rounded-lg p-2.5 text-center">
          <Target size={14} className="text-brand-accent mx-auto mb-1" />
          <p className="text-xs font-semibold text-brand-primary">
            {phaseProgress.length} phases
          </p>
          <p className="text-[10px] text-brand-muted">Learning phases</p>
        </div>
        <div className="bg-brand-bg/30 rounded-lg p-2.5 text-center">
          <CheckCircle2 size={14} className="text-brand-accent mx-auto mb-1" />
          <p className="text-xs font-semibold text-brand-primary">
            {roadmap.overallProgress}%
          </p>
          <p className="text-[10px] text-brand-muted">Completed</p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold text-brand-primary">Phase Progress</p>
        {firstThreePhases.map((phase) => (
          <div key={phase.phaseId} className="flex items-start gap-3">
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                phase.isCurrent
                  ? "bg-brand-accent text-white"
                  : "bg-brand-bg text-brand-accent"
              }`}
            >
              {phase.phaseOrder}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-brand-primary">
                  {phase.title}
                </p>
                <p className="text-xs text-brand-muted">{phase.progress}%</p>
              </div>
              <div className="h-1 bg-brand-bg rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-brand-accent rounded-full transition-all"
                  style={{ width: `${phase.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
