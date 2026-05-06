// app/roadmap/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
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
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { useRoadmap } from "@/hooks/useRoadmap";
import { getSkillLevelLabel } from "@/constants/roadmap.constants";

/* ─── Skeleton Loader ────────────────────────────────────────────── */
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#C2E8FF]/60 rounded-lg animate-pulse ${className}`} />
  );
}

/* ─── Phase Card Component ───────────────────────────────────────── */
function PhaseCard({ phase, isExpanded, onToggle }: { 
  phase: any; 
  isExpanded: boolean; 
  onToggle: () => void;
}) {
  return (
    <Card variant="default" padding="none" className="overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-[#C2E8FF]/20 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#000F22] flex items-center justify-center">
            <span className="text-white text-sm font-bold">{phase.phaseOrder}</span>
          </div>
          <div>
            <h3 className="font-semibold text-[#000F22]">{phase.title}</h3>
            <p className="text-xs text-[#537FAF] mt-0.5">
              {phase.estimatedWeeks} weeks • {phase.skills?.length || 0} skills
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp size={18} className="text-[#537FAF]" />
        ) : (
          <ChevronDown size={18} className="text-[#537FAF]" />
        )}
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 pt-2 border-t border-[#7A9BC4]/15">
          <p className="text-sm text-[#537FAF] mb-4">{phase.description}</p>
          
          <div className="space-y-4">
            {phase.skills?.map((skill: any) => (
              <div key={skill.skillId} className="bg-[#C2E8FF]/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-[#000F22]">{skill.skillName}</h4>
                    <p className="text-xs text-[#537FAF] mt-0.5">
                      {skill.estimatedDays} days • {skill.steps?.length || 0} steps
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#537FAF]">Target level</span>
                    <p className="text-sm font-semibold text-[#557EB2]">
                      {getSkillLevelLabel(skill.targetLevel)}
                    </p>
                  </div>
                </div>

                {/* Resources */}
                {skill.resources && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-[#042558] mb-1.5">Resources</p>
                    <div className="flex flex-wrap gap-2">
                      {JSON.parse(skill.resources).map((resource: string, idx: number) => (
                        <a
                          key={idx}
                          href="#"
                          className="text-xs text-[#557EB2] hover:text-[#042558] flex items-center gap-1"
                        >
                          <ExternalLink size={10} />
                          {resource}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Steps */}
                <div>
                  <p className="text-xs font-semibold text-[#042558] mb-2">Steps</p>
                  <div className="space-y-2">
                    {skill.steps?.map((step: any) => (
                      <div key={step.stepId} className="flex items-start gap-2.5">
                        {step.completed ? (
                          <CheckCircle2 size={14} className="text-[#16A34A] mt-0.5" />
                        ) : (
                          <Circle size={14} className="text-[#7A9BC4] mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className={`text-sm ${step.completed ? "text-[#537FAF] line-through" : "text-[#000F22]"}`}>
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
            ))}
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
  const { data: roadmap, isLoading: roadmapLoading, error } = useRoadmap(roadmapId);
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set());

  /* Auth guard */
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  /* Auto-expand first phase */
  useEffect(() => {
    if (roadmap?.phases && roadmap.phases.length > 0) {
      setExpandedPhases(new Set([roadmap.phases[0].phaseId]));
    }
  }, [roadmap]);

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

  if (error || !roadmap) {
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

  const togglePhase = (phaseId: number) => {
    setExpandedPhases((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(phaseId)) {
        newSet.delete(phaseId);
      } else {
        newSet.add(phaseId);
      }
      return newSet;
    });
  };

  const totalSteps = roadmap.phases.reduce(
    (acc, phase) => acc + phase.skills.reduce((sum, skill) => sum + (skill.steps?.length || 0), 0),
    0
  );
  
  const completedSteps = roadmap.phases.reduce(
    (acc, phase) => acc + phase.skills.reduce((sum, skill) => sum + (skill.steps?.filter((s: any) => s.completed).length || 0), 0),
    0
  );
  
  const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

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
            <div className="hidden sm:block w-16 h-16 rounded-xl bg-[#C2E8FF] flex items-center justify-center">
              <Trophy size={28} className="text-[#557EB2]" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-[#7A9BC4]/15">
            <div className="text-center">
              <Calendar size={16} className="text-[#557EB2] mx-auto mb-1" />
              <p className="text-xl font-bold text-[#000F22]">{roadmap.totalEstimatedWeeks}</p>
              <p className="text-[10px] text-[#537FAF]">Total weeks</p>
            </div>
            <div className="text-center">
              <Layers size={16} className="text-[#557EB2] mx-auto mb-1" />
              <p className="text-xl font-bold text-[#000F22]">{roadmap.phases?.length || 0}</p>
              <p className="text-[10px] text-[#537FAF]">Learning phases</p>
            </div>
            <div className="text-center">
              <BookOpen size={16} className="text-[#557EB2] mx-auto mb-1" />
              <p className="text-xl font-bold text-[#000F22]">{totalSteps}</p>
              <p className="text-[10px] text-[#537FAF]">Total steps</p>
            </div>
            <div className="text-center">
              <Target size={16} className="text-[#557EB2] mx-auto mb-1" />
              <p className="text-xl font-bold text-[#000F22]">{progress}%</p>
              <p className="text-[10px] text-[#537FAF]">Completed</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-[#537FAF] mb-1">
              <span>Overall Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-[#C2E8FF] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#557EB2] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Phases Section */}
        <div className="space-y-3">
          <h2 className="font-display text-[#000F22] text-xl mb-3">Your Learning Path</h2>
          {roadmap.phases?.map((phase) => (
            <PhaseCard
              key={phase.phaseId}
              phase={phase}
              isExpanded={expandedPhases.has(phase.phaseId)}
              onToggle={() => togglePhase(phase.phaseId)}
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