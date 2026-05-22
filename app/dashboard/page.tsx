// app/dashboard/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  MessageSquare,
  TrendingUp,
  Target,
  Sparkles,
  Clock,
  MapPin,
  BriefcaseBusiness,
  ArrowRight,
  Calendar,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProfileCompletionBanner from "@/components/dashboard/ProfileCompletionBanner";
import FeatureShowcase from "@/components/dashboard/FeatureShowcase";
import { useAuth } from "@/hooks/useAuth";
import { useDashboard } from "@/hooks/useDashboard";
import { useUserProfile } from "@/hooks/useUserProfile";

/* ─── Loading skeleton ───────────────────────────────────────────── */
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#C2E8FF]/60 rounded-lg animate-pulse ${className}`} />
  );
}

/* ─── Generate Roadmap CTA ───────────────────────────────────────── */
function GenerateRoadmapCTA({ userName }: { userName: string }) {
  const router = useRouter();

  return (
    <Card
      variant="flat"
      padding="lg"
      className="relative overflow-hidden bg-gradient-to-br from-[#000F22] to-[#042558] border-none"
    >
      <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#557EB2]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#7A9BC4]/10 blur-2xl" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-5">
          <Sparkles size={14} className="text-[#7A9BC4]" />
          <span className="text-[11px] font-medium text-[#7A9BC4] uppercase tracking-wider">
            Ai Powered
          </span>
        </div>

        <h2 className="font-display text-white text-2xl sm:text-3xl lg:text-4xl mb-3">
          Transform your career journey, {userName?.split(" ")[0]}
        </h2>

        <p className="text-[#7A9BC4] text-sm sm:text-base max-w-md mb-6 leading-relaxed">
          Generate a comprehensive, step-by-step roadmap tailored to your
          skills, experience, and career aspirations.
        </p>

        <Button
          onClick={() => router.push("/roadmap/generate")}
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight size={16} />}
        >
          Generate Roadmap
        </Button>
      </div>
    </Card>
  );
}

/* ─── Roadmap Preview Card (Updated with new API) ────────────────── */
function RoadmapPreview({ roadmap }: { roadmap: any }) {
  const router = useRouter();
  const phaseProgress = roadmap.phaseProgress || [];
  const firstThreePhases = phaseProgress.slice(0, 3);

  return (
    <Card variant="default" padding="md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#557EB2]">
            Active Roadmap
          </p>
          <p className="font-semibold text-[#000F22] text-sm mt-0.5">
            {roadmap.dreamJob}
          </p>
        </div>
        <Link
          href={`/roadmap/${roadmap.roadmapId}`}
          className="text-xs font-medium text-[#557EB2] hover:text-[#042558] flex items-center gap-1 transition-colors"
        >
          View Details <ArrowRight size={12} />
        </Link>
      </div>

      {/* Current Phase Progress */}
      {roadmap.currentPhase && (
        <div className="mb-4 p-3 bg-[#C2E8FF]/30 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-[#000F22]">
              Current Phase: {roadmap.currentPhase.title}
            </p>
            <p className="text-xs font-semibold text-[#557EB2]">
              {roadmap.currentPhase.phaseProgress}%
            </p>
          </div>
          <div className="h-1.5 bg-[#C2E8FF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#557EB2] rounded-full transition-all"
              style={{ width: `${roadmap.currentPhase.phaseProgress}%` }}
            />
          </div>
          <p className="text-[10px] text-[#537FAF] mt-1.5">
            {roadmap.currentPhase.completedSkills} of{" "}
            {roadmap.currentPhase.totalSkills} skills completed
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-[#C2E8FF]/30 rounded-lg p-2.5 text-center">
          <Calendar size={14} className="text-[#557EB2] mx-auto mb-1" />
          <p className="text-xs font-semibold text-[#000F22]">
            {roadmap.totalEstimatedWeeks} weeks
          </p>
          <p className="text-[10px] text-[#537FAF]">Total duration</p>
        </div>
        <div className="bg-[#C2E8FF]/30 rounded-lg p-2.5 text-center">
          <Target size={14} className="text-[#557EB2] mx-auto mb-1" />
          <p className="text-xs font-semibold text-[#000F22]">
            {phaseProgress.length} phases
          </p>
          <p className="text-[10px] text-[#537FAF]">Learning phases</p>
        </div>
        <div className="bg-[#C2E8FF]/30 rounded-lg p-2.5 text-center">
          <CheckCircle2 size={14} className="text-[#557EB2] mx-auto mb-1" />
          <p className="text-xs font-semibold text-[#000F22]">
            {roadmap.overallProgress}%
          </p>
          <p className="text-[10px] text-[#537FAF]">Completed</p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold text-[#000F22]">Phase Progress</p>
        {firstThreePhases.map((phase: any, idx: number) => (
          <div key={phase.phaseId} className="flex items-start gap-3">
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                phase.isCurrent
                  ? "bg-[#557EB2] text-white"
                  : "bg-[#C2E8FF] text-[#557EB2]"
              }`}
            >
              {phase.phaseOrder}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[#000F22]">
                  {phase.title}
                </p>
                <p className="text-xs text-[#537FAF]">{phase.progress}%</p>
              </div>
              <div className="h-1 bg-[#C2E8FF] rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-[#557EB2] rounded-full transition-all"
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

/* ─── Resume Preview Card (New) ──────────────────────────────────── */
function ResumePreview({ resume }: { resume: any }) {
  const router = useRouter();

  const getScoreColor = (score: number) => {
    if (score >= 70) return "#16A34A";
    if (score >= 50) return "#D97706";
    return "#DC2626";
  };

  return (
    <Card
      variant="default"
      padding="md"
      className="cursor-pointer hover:shadow-lg transition-all duration-200"
      onClick={() => router.push(`/resume-analysis/${resume.resumeId}`)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-[#557EB2]" />
          <p className="text-xs font-medium uppercase tracking-wider text-[#557EB2]">
            Latest Analysis
          </p>
        </div>
        <span className="text-[10px] font-medium text-[#537FAF]">
          {new Date(resume.uploadedAt).toLocaleDateString()}
        </span>
      </div>

      <p className="font-semibold text-[#000F22] text-sm mb-2 truncate">
        {resume.fileName}
      </p>

      <p className="text-xs text-[#537FAF] leading-relaxed mb-3 line-clamp-2">
        {resume.resumeVerdict}
      </p>

      <div className="flex items-center gap-4">
        <div className="text-center">
          <p
            className="text-xl font-bold text-[#000F22]"
            style={{ color: getScoreColor(resume.overallScore) }}
          >
            {resume.overallScore}
          </p>
          <p className="text-[9px] text-[#537FAF]">Overall</p>
        </div>
        <div className="text-center">
          <p
            className="text-xl font-bold text-[#000F22]"
            style={{ color: getScoreColor(resume.atsScore) }}
          >
            {resume.atsScore}
          </p>
          <p className="text-[9px] text-[#537FAF]">ATS Score</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-[#000F22]">
            {resume.interviewReadiness}
          </p>
          <p className="text-[9px] text-[#537FAF]">Readiness</p>
        </div>
      </div>
    </Card>
  );
}

/* ─── Stats Summary Card (New) ───────────────────────────────────── */
function StatsSummary({ stats }: { stats: any }) {
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
          <div className="w-8 h-8 rounded-full bg-[#C2E8FF] flex items-center justify-center mx-auto mb-2">
            <item.icon size={14} className="text-[#557EB2]" />
          </div>
          <p className="text-xl font-bold text-[#000F22]">{item.value}</p>
          <p className="text-xs text-[#537FAF]">{item.label}</p>
          {item.total && (
            <p className="text-[10px] text-[#7A9BC4] mt-0.5">
              out of {item.total}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────── */
export default function DashboardPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { data: dashboard, isLoading: dashboardLoading } = useDashboard();
  const { data: profile, isLoading: profileLoading } = useUserProfile();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.replace("/login");
  }, [authLoading, isAuthenticated, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#C2E8FF] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#557EB2] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const isLoading = dashboardLoading || profileLoading;
  const dashboardData = dashboard;
  const profileData = profile;

  // Profile incomplete case
  if (!isLoading && profileData && !dashboardData?.profileStatus?.isComplete) {
    return (
      <div className="min-h-screen bg-[#C2E8FF] flex">
        <Sidebar />
        <main className="flex-1 min-w-0 max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col gap-5">
            <div className="animate-fade-up">
              <h1 className="font-display text-[#000F22] text-2xl sm:text-3xl">
                Good day, {profileData?.name?.split(" ")[0] ?? "there"}
              </h1>
              <p className="text-sm text-[#537FAF] mt-0.5">
                Complete your profile to unlock personalized career guidance.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="animate-fade-up delay-1">
                <ProfileCompletionBanner profile={profileData} />
              </div>
              <div className="animate-fade-up delay-2">
                <FeatureShowcase />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#C2E8FF] flex">
      <Sidebar />

      <main className="flex-1 min-w-0 max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col gap-5">
          {/* Welcome Section */}
          <div className="animate-fade-up">
            <h1 className="font-display text-[#000F22] text-2xl sm:text-3xl">
              {isLoading
                ? "Welcome back"
                : `Good day, ${dashboardData?.user?.name?.split(" ")[0] ?? "there"}`}
            </h1>
            <p className="text-sm text-[#537FAF] mt-0.5">
              {dashboardData?.roadmap
                ? "Continue your career journey with your personalized roadmap."
                : "Generate your career roadmap to get started."}
            </p>
          </div>

          {/* Usage Cards Row - Roadmap + Resume Limits */}
          {!isLoading && dashboardData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up delay-1">
              {/* Roadmap Limit Card */}
              <Card
                variant="flat"
                padding="sm"
                className="border border-[#7A9BC4]/20"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#C2E8FF] flex items-center justify-center">
                      <Target size={12} className="text-[#557EB2]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#042558]">
                        Roadmap Limit
                      </p>
                      <p className="text-[10px] text-[#537FAF]">
                        {dashboardData.limits.roadmapLimit.used} /{" "}
                        {dashboardData.limits.roadmapLimit.total} used
                      </p>
                    </div>
                  </div>
                  {dashboardData.limits.roadmapLimit.limitReached && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => router.push("/pricing")}
                    >
                      Upgrade
                    </Button>
                  )}
                </div>
                <div className="mt-1.5 h-1 bg-[#C2E8FF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#557EB2] rounded-full"
                    style={{
                      width: `${(dashboardData.limits.roadmapLimit.used / dashboardData.limits.roadmapLimit.total) * 100}%`,
                    }}
                  />
                </div>
              </Card>

              {/* Resume Limit Card */}
              <Card
                variant="flat"
                padding="sm"
                className="border border-[#7A9BC4]/20"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#C2E8FF] flex items-center justify-center">
                      <FileText size={12} className="text-[#557EB2]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#042558]">
                        Resume Limit
                      </p>
                      <p className="text-[10px] text-[#537FAF]">
                        {dashboardData.limits.resumeLimit.used} /{" "}
                        {dashboardData.limits.resumeLimit.total} used
                      </p>
                    </div>
                  </div>
                  {dashboardData.limits.resumeLimit.limitReached && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => router.push("/pricing")}
                    >
                      Upgrade
                    </Button>
                  )}
                </div>
                <div className="mt-1.5 h-1 bg-[#C2E8FF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#557EB2] rounded-full"
                    style={{
                      width: `${(dashboardData.limits.resumeLimit.used / dashboardData.limits.resumeLimit.total) * 100}%`,
                    }}
                  />
                </div>
              </Card>
            </div>
          )}

          {/* Stats Summary */}
          {!isLoading && dashboardData && (
            <div className="animate-fade-up delay-1">
              <StatsSummary stats={dashboardData.stats} />
            </div>
          )}

          {/* Main Content */}
          {isLoading ? (
            <div className="flex flex-col gap-4 animate-fade-up delay-2">
              <Skeleton className="h-64" />
              <Skeleton className="h-40" />
            </div>
          ) : dashboardData?.roadmap ? (
            /* Has Roadmap */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-up delay-2">
              <RoadmapPreview roadmap={dashboardData.roadmap} />
              {dashboardData.resume && (
                <ResumePreview resume={dashboardData.resume} />
              )}
            </div>
          ) : (
            /* Profile Complete but No Roadmap */
            <div className="animate-fade-up delay-2 flex flex-col gap-4">
              <GenerateRoadmapCTA userName={dashboardData?.user?.name || ""} />
              <FeatureShowcase />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
