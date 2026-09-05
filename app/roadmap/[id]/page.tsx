// app/roadmap/[id]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  BriefcaseBusiness,
  Loader2,
  Info,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Skeleton from "@/components/dashboard/Skeleton";
import RoadmapHero from "@/components/roadmap/RoadmapHero";
import PhaseCard from "@/components/roadmap/PhaseCard";
import { useRoadmap, useUpdateStepCompletion } from "@/hooks/useRoadmap";
import { countRoadmapSteps, toPercent } from "@/utils/roadmapProgress";

// Auth is handled by useRouteGuard in ClientLayoutWrapper - this page only
// renders once the guard has confirmed the user is logged in.
export default function RoadmapDetailPage() {
  const params = useParams();
  const router = useRouter();
  const roadmapId = parseInt(params.id as string);
  const {
    data: roadmap,
    isLoading: roadmapLoading,
    refetch,
  } = useRoadmap(roadmapId);
  const updateStepMutation = useUpdateStepCompletion(roadmapId);

  const handleStepToggle = (stepId: number, completed: boolean) => {
    updateStepMutation.mutate(
      { stepId, completed, skipped: false },
      {
        onSuccess: () => {
          refetch(); // Refresh the roadmap data
        },
      },
    );
  };

  if (roadmapLoading) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <Skeleton className="h-64 mb-6" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="page-shell-centered">
        <Card variant="default" padding="lg" className="text-center max-w-md">
          <p className="text-brand-primary font-semibold mb-2">
            Roadmap not found
          </p>
          <p className="page-subtitle mx-auto mb-4">
            The roadmap you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button variant="primary" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  // One pass over the whole roadmap gives both counts - previously this was
  // three separate loops doing almost the same work.
  const { total: totalSteps, completed: completedSteps } = countRoadmapSteps(
    roadmap.phases,
  );
  const overallProgress = toPercent(completedSteps, totalSteps);

  return (
    <div className="page-shell">
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand-secondary transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <RoadmapHero
          roadmap={roadmap}
          totalSteps={totalSteps}
          completedSteps={completedSteps}
          overallProgress={overallProgress}
        />

        {/* Phases Section */}
        <div className="space-y-3">
          <h2 className="subsection-title mb-3">
            Your Learning Path
          </h2>

          {/* Recommended approach notice */}
          <div className="bg-gradient-to-r from-brand-bg to-white border-l-4 border-brand-accent rounded-lg p-4 flex items-start gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center flex-shrink-0">
              <Info size={14} className="text-brand-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-brand-secondary mb-0.5">
                Recommended approach
              </p>
              <p className="text-xs text-brand-muted leading-relaxed">
                This roadmap is designed step-by-step for optimal learning. We
                recommend completing phases in order, but you&apos;re free to
                explore ahead at any time.
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-brand-success/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={14} className="text-brand-success" />
            </div>
          </div>

          {/* Toast-style saving indicator while a step toggle is in flight */}
          {updateStepMutation.isPending && (
            <div className="fixed bottom-4 right-4 bg-brand-primary text-white text-xs px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
              <Loader2 size={14} className="animate-spin" />
              Saving progress...
            </div>
          )}

          {roadmap.phases?.map((phase) => (
            <PhaseCard
              key={phase.phaseId}
              phase={phase}
              onStepToggle={handleStepToggle}
              isUpdating={updateStepMutation.isPending}
            />
          ))}
        </div>

        {/* Footer Action */}
        <div className="mt-8 text-center">
          <Button
            variant="ghost"
            size="md"
            leftIcon={<BriefcaseBusiness size={14} />}
            onClick={() => router.push("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
