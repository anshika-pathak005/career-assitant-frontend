// components/dashboard/StatsSummary.tsx

import { FileText, MapPin, Target, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import type { DashboardStats } from "@/types/dashboard.types";

/** Four aggregate stat tiles across the top of the dashboard. */
export default function StatsSummary({ stats }: { stats: DashboardStats }) {
  const statItems = [
    {
      label: "Steps Completed",
      value: stats.totalStepsCompleted,
      total: stats.totalSteps,
      icon: CheckCircle2,
      color: "#16A34A",
    },
    {
      label: "Resumes Analyzed",
      value: stats.totalResumesAnalyzed,
      icon: FileText,
      color: "#557EB2",
    },
    {
      label: "Roadmaps Generated",
      value: stats.totalRoadmapsGenerated,
      icon: MapPin,
      color: "#D97706",
    },
    {
      label: "Phases Completed",
      value: stats.totalPhasesCompleted,
      icon: Target,
      color: "#7A9BC4",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <Card
          key={item.label}
          variant="flat"
          padding="md"
          className="text-center"
        >
          <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center mx-auto mb-2">
            <item.icon size={14} className="text-brand-accent" />
          </div>
          <p className="text-xl font-bold text-brand-primary">{item.value}</p>
          <p className="text-xs text-brand-muted">{item.label}</p>
          {item.total && (
            <p className="text-[10px] text-brand-accent-lt mt-0.5">
              out of {item.total}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}
