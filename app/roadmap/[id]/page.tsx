// app/roadmap/[id]/page.tsx (FULLY INTERACTIVE VERSION)

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Target,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  Circle,
  BookOpen,
  BriefcaseBusiness,
  Sparkles,
  Trophy,
  Layers,
  Loader2,
  Info,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { useRoadmap, useUpdateStepCompletion } from "@/hooks/useRoadmap";
import { getSkillLevelLabel } from "@/constants/roadmap.constants";

/* ─── Skeleton Loader ────────────────────────────────────────────── */
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#C2E8FF]/60 rounded-lg animate-pulse ${className}`} />
  );
}

/* ─── Progress Bar Component ─────────────────────────────────────── */
function ProgressBar({
  progress,
  label,
}: {
  progress: number;
  label?: string;
}) {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs text-[#537FAF] mb-1">
          <span>{label}</span>
          <span>{progress}%</span>
        </div>
      )}
      <div className="h-1.5 bg-[#C2E8FF] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#557EB2] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

/* ─── Phase Card Component with Progress ─────────────────────────── */
function PhaseCard({
  phase,
  onStepToggle,
  isUpdating,
}: {
  phase: any;
  onStepToggle: (stepId: number, completed: boolean) => void;
  isUpdating: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate phase progress from skill progresses
  const totalSteps = phase.skills?.reduce(
    (acc: number, skill: any) => acc + (skill.steps?.length || 0),
    0,
  );
  const completedSteps = phase.skills?.reduce(
    (acc: number, skill: any) =>
      acc + (skill.steps?.filter((s: any) => s.completed).length || 0),
    0,
  );
  const phaseProgress =
    totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <Card variant="default" padding="none" className="overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-[#C2E8FF]/20 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#000F22] flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {phase.phaseOrder}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#000F22]">{phase.title}</h3>
            <p className="text-xs text-[#537FAF] mt-0.5">
              {phase.estimatedWeeks} weeks • {phase.skills?.length || 0} skills
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-24">
            <ProgressBar progress={phaseProgress} />
          </div>
          {isExpanded ? (
            <ChevronUp size={18} className="text-[#537FAF]" />
          ) : (
            <ChevronDown size={18} className="text-[#537FAF]" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 pt-2 border-t border-[#7A9BC4]/15">
          <p className="text-sm text-[#537FAF] mb-4">{phase.description}</p>

          <div className="space-y-4">
            {phase.skills?.map((skill: any) => {
              const skillTotalSteps = skill.steps?.length || 0;
              const skillCompletedSteps =
                skill.steps?.filter((s: any) => s.completed).length || 0;
              const skillProgress =
                skillTotalSteps > 0
                  ? Math.round((skillCompletedSteps / skillTotalSteps) * 100)
                  : 0;

              return (
                <div
                  key={skill.skillId}
                  className="bg-[#C2E8FF]/20 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-[#000F22]">
                          {skill.skillName}
                        </h4>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#7A9BC4]/20 text-[#537FAF]">
                          {skill.skillType}
                        </span>
                      </div>
                      <p className="text-xs text-[#537FAF] mt-0.5">
                        {skill.estimatedDays} days
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#537FAF]">
                        Target level
                      </span>
                      <p className="text-sm font-semibold text-[#557EB2]">
                        {getSkillLevelLabel(skill.targetLevel)}
                      </p>
                    </div>
                  </div>

                  {/* Skill Progress Bar */}
                  {skillTotalSteps > 0 && (
                    <div className="mb-3">
                      <ProgressBar
                        progress={skillProgress}
                        label="Skill Progress"
                      />
                    </div>
                  )}

                  {/* Resources */}
                  {skill.resources &&
                    (() => {
                      try {
                        const resources = JSON.parse(skill.resources);
                        if (resources && resources.length > 0) {
                          return (
                            <div className="mb-3">
                              <p className="text-xs font-semibold text-[#042558] mb-2">
                                Learning Resources
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {resources.map(
                                  (
                                    resource: {
                                      name: string;
                                      url: string;
                                      type: string;
                                    },
                                    idx: number,
                                  ) => (
                                    <a
                                      key={idx}
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#7A9BC4]/30 text-[#042558] hover:bg-[#557EB2] hover:text-white hover:border-[#557EB2] transition-all duration-150 text-xs font-medium"
                                    >
                                      <ExternalLink size={10} />
                                      {resource.name}
                                      <span className="text-[9px] opacity-70 uppercase">
                                        {resource.type}
                                      </span>
                                    </a>
                                  ),
                                )}
                              </div>
                            </div>
                          );
                        }
                      } catch (e) {
                        return null;
                      }
                      return null;
                    })()}

                  {/* Steps with Checkboxes */}
                  <div>
                    <p className="text-xs font-semibold text-[#042558] mb-2">
                      Steps to Complete
                    </p>
                    <div className="space-y-2">
                      {skill.steps?.map((step: any) => (
                        <div
                          key={step.stepId}
                          className="flex items-start gap-2.5 group"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              onStepToggle(step.stepId, !step.completed)
                            }
                            disabled={isUpdating}
                            className="mt-0.5 focus:outline-none"
                          >
                            {step.completed ? (
                              <CheckCircle2
                                size={16}
                                className="text-[#16A34A] hover:text-[#16A34A]/70 transition-colors"
                              />
                            ) : (
                              <Circle
                                size={16}
                                className="text-[#7A9BC4] hover:text-[#557EB2] transition-colors"
                              />
                            )}
                          </button>
                          <div className="flex-1">
                            <p
                              className={`text-sm ${step.completed ? "text-[#537FAF] line-through" : "text-[#000F22]"}`}
                            >
                              {step.title}
                            </p>
                            <p className="text-xs text-[#7A9BC4] mt-0.5">
                              {step.estimatedHours} hours
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────── */
export default function RoadmapDetailPage() {
  const params = useParams();
  const router = useRouter();
  const roadmapId = parseInt(params.id as string);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const {
    data: roadmap,
    isLoading: roadmapLoading,
    refetch,
  } = useRoadmap(roadmapId);
  const updateStepMutation = useUpdateStepCompletion(roadmapId);

  /* ─── Handle step toggle ───────────────────────────────────────── */
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

  /* ─── Calculate overall progress ───────────────────────────────── */
  const calculateOverallProgress = () => {
    if (!roadmap?.phases) return 0;

    let totalSteps = 0;
    let completedSteps = 0;

    roadmap.phases.forEach((phase: any) => {
      phase.skills?.forEach((skill: any) => {
        totalSteps += skill.steps?.length || 0;
        completedSteps +=
          skill.steps?.filter((s: any) => s.completed).length || 0;
      });
    });

    return totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  };

  const totalSteps = () => {
    if (!roadmap?.phases) return 0;
    let count = 0;
    roadmap.phases.forEach((phase: any) => {
      phase.skills?.forEach((skill: any) => {
        count += skill.steps?.length || 0;
      });
    });
    return count;
  };

  const completedStepsCount = () => {
    if (!roadmap?.phases) return 0;
    let count = 0;
    roadmap.phases.forEach((phase: any) => {
      phase.skills?.forEach((skill: any) => {
        count += skill.steps?.filter((s: any) => s.completed).length || 0;
      });
    });
    return count;
  };

  /* ─── Auth guard ───────────────────────────────────────────────── */
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || roadmapLoading) {
    return (
      <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-64 mb-6" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-[#C2E8FF] flex items-center justify-center">
        <Card variant="default" padding="lg" className="text-center max-w-md">
          <p className="text-[#000F22] font-semibold mb-2">Roadmap not found</p>
          <p className="text-sm text-[#537FAF] mb-4">
            The roadmap you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const overallProgress = calculateOverallProgress();
  const totalStepsCount = totalSteps();
  const completedCount = completedStepsCount();

  return (
    <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-[#537FAF] hover:text-[#042558] transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* Hero Section */}
        <Card variant="default" padding="lg" className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#C2E8FF] rounded-full px-2.5 py-0.5 mb-3">
                <Sparkles size={10} className="text-[#557EB2]" />
                <span className="text-[10px] font-semibold text-[#557EB2] uppercase tracking-wider">
                  Active Roadmap
                </span>
              </div>
              <h1 className="font-display text-[#000F22] text-2xl sm:text-3xl mb-2">
                {roadmap.dreamJob}
              </h1>
              <p className="text-sm text-[#537FAF] leading-relaxed">
                {roadmap.summary}
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 rounded-xl bg-[#C2E8FF] items-center justify-center">
              <Trophy size={28} className="text-[#557EB2]" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-[#7A9BC4]/15">
            <div className="text-center">
              <Calendar size={16} className="text-[#557EB2] mx-auto mb-1" />
              <p className="text-xl font-bold text-[#000F22]">
                {roadmap.totalEstimatedWeeks}
              </p>
              <p className="text-[10px] text-[#537FAF]">Total weeks</p>
            </div>
            <div className="text-center">
              <Layers size={16} className="text-[#557EB2] mx-auto mb-1" />
              <p className="text-xl font-bold text-[#000F22]">
                {roadmap.phases?.length || 0}
              </p>
              <p className="text-[10px] text-[#537FAF]">Learning phases</p>
            </div>
            <div className="text-center">
              <BookOpen size={16} className="text-[#557EB2] mx-auto mb-1" />
              <p className="text-xl font-bold text-[#000F22]">
                {totalStepsCount}
              </p>
              <p className="text-[10px] text-[#537FAF]">Total steps</p>
            </div>
            <div className="text-center">
              <CheckCircle2 size={16} className="text-[#16A34A] mx-auto mb-1" />
              <p className="text-xl font-bold text-[#000F22]">
                {completedCount}
              </p>
              <p className="text-[10px] text-[#537FAF]">Completed</p>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="mt-4">
            <ProgressBar progress={overallProgress} label="Overall Progress" />
          </div>
        </Card>

        {/* Phases Section */}
        <div className="space-y-3">
          <h2 className="font-display text-[#000F22] text-xl mb-3">
            Your Learning Path
          </h2>

          {/* Pre-filled Information Notice - HIGHLIGHTED */}
          <div className="bg-gradient-to-r from-[#C2E8FF] to-white border-l-4 border-[#557EB2] rounded-lg p-4 flex items-start gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#557EB2]/20 flex items-center justify-center flex-shrink-0">
              <Info size={14} className="text-[#557EB2]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#042558] mb-0.5">
                Recommended approach
              </p>
              <p className="text-xs text-[#537FAF] leading-relaxed">
                This roadmap is designed step-by-step for optimal learning. We
                recommend completing phases in order, but you're free to explore
                ahead at any time.
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={14} className="text-[#16A34A]" />
            </div>
          </div>

          {updateStepMutation.isPending && (
            <div className="fixed bottom-4 right-4 bg-[#000F22] text-white text-xs px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
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
