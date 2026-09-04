// components/roadmap/RoadmapHero.tsx

import {
  Calendar,
  Layers,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Trophy,
} from "lucide-react";
import Card from "@/components/ui/Card";
import ProgressBar from "./ProgressBar";
import type { Roadmap } from "@/types/roadmap.types";

interface Props {
  roadmap: Roadmap;
  totalSteps: number;
  completedSteps: number;
  overallProgress: number;
}

/** Title, summary, four stat tiles and the overall progress bar. */
export default function RoadmapHero({
  roadmap,
  totalSteps,
  completedSteps,
  overallProgress,
}: Props) {
  const stats = [
    { icon: Calendar, value: roadmap.totalEstimatedWeeks, label: "Total weeks" },
    {
      icon: Layers,
      value: roadmap.phases?.length || 0,
      label: "Learning phases",
    },
    { icon: BookOpen, value: totalSteps, label: "Total steps" },
    {
      icon: CheckCircle2,
      value: completedSteps,
      label: "Completed",
      accent: true,
    },
  ];

  return (
    <Card variant="default" padding="lg" className="mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-brand-bg rounded-full px-2.5 py-0.5 mb-3">
            <Sparkles size={10} className="text-brand-accent" />
            <span className="text-[10px] font-semibold text-brand-accent uppercase tracking-wider">
              Active Roadmap
            </span>
          </div>
          <h1 className="font-display text-brand-primary text-2xl sm:text-3xl mb-2">
            {roadmap.dreamJob}
          </h1>
          <p className="text-sm text-brand-muted leading-relaxed">
            {roadmap.summary}
          </p>
        </div>
        <div className="hidden sm:flex w-16 h-16 rounded-xl bg-brand-bg items-center justify-center">
          <Trophy size={28} className="text-brand-accent" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-brand-accent-lt/15">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <stat.icon
              size={16}
              className={`${stat.accent ? "text-brand-success" : "text-brand-accent"} mx-auto mb-1`}
            />
            <p className="text-xl font-bold text-brand-primary">{stat.value}</p>
            <p className="text-[10px] text-brand-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <ProgressBar progress={overallProgress} label="Overall Progress" />
      </div>
    </Card>
  );
}
