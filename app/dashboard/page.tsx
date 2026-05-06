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
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useLatestRoadmap } from "@/hooks/useRoadmap";

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

/* ─── Roadmap Preview Card ───────────────────────────────────────── */
function RoadmapPreview({ roadmap }: { roadmap: any }) {
  const firstThreePhases = roadmap.phases?.slice(0, 3) || [];

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

      <p className="text-xs text-[#537FAF] leading-relaxed mb-4 line-clamp-2">
        {roadmap.summary}
      </p>

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
            {roadmap.phases?.length || 0} phases
          </p>
          <p className="text-[10px] text-[#537FAF]">Learning phases</p>
        </div>
        <div className="bg-[#C2E8FF]/30 rounded-lg p-2.5 text-center">
          <CheckCircle2 size={14} className="text-[#557EB2] mx-auto mb-1" />
          <p className="text-xs font-semibold text-[#000F22]">0%</p>
          <p className="text-[10px] text-[#537FAF]">Completed</p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold text-[#000F22]">Upcoming phases</p>
        {firstThreePhases.map((phase: any, idx: number) => (
          <div key={phase.phaseId} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C2E8FF] flex items-center justify-center text-xs font-semibold text-[#557EB2]">
              {idx + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#000F22]">
                {phase.title}
              </p>
              <p className="text-xs text-[#537FAF]">
                {phase.estimatedWeeks} weeks • {phase.skills?.length || 0}{" "}
                skills
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── Quick Stats Cards ──────────────────────────────────────────── */
function QuickStats({ profile }: { profile: any }) {
  const stats = [
    {
      label: "Skills mastered",
      value: profile?.skills?.length || 0,
      icon: TrendingUp,
      description: "Technologies in your stack",
    },
    {
      label: "Target role",
      value:
        profile?.dreamJob?.split(" ").slice(0, 2).join(" ") || "Not defined",
      icon: BriefcaseBusiness,
      description: "Your career destination",
    },
    {
      label: "Industries",
      value: profile?.industries?.length || 0,
      icon: MapPin,
      description: "Sectors you are targeting",
    },
    {
      label: "Experience",
      value:
        profile?.experienceYears !== null
          ? `${profile.experienceYears}+ years`
          : "Not defined",
      icon: BarChart3,
      description: "Professional background",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          variant="default"
          padding="md"
          className="hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#C2E8FF] flex items-center justify-center">
              <stat.icon size={18} className="text-[#557EB2]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#000F22] mb-1">{stat.value}</p>
          <p className="text-sm font-medium text-[#000F22] mb-0.5">
            {stat.label}
          </p>
          <p className="text-xs text-[#537FAF]">{stat.description}</p>
        </Card>
      ))}
    </div>
  );
}

/* ─── Feature Cards (when no roadmap) ────────────────────────────── */
function FeatureCards() {
  const features = [
    {
      icon: FileText,
      title: "Personalized Roadmap",
      description:
        "Step-by-step plan tailored to your skills and career goals.",
    },
    {
      icon: MessageSquare,
      title: "AI Career Assistant",
      description: "Get instant answers to your career questions and concerns.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning journey and celebrate milestones.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {features.map((feature) => (
        <Card
          key={feature.title}
          variant="default"
          padding="md"
          className="hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-lg bg-[#C2E8FF] flex items-center justify-center mb-3">
            <feature.icon size={18} className="text-[#557EB2]" />
          </div>
          <p className="font-semibold text-[#000F22] text-sm mb-1">
            {feature.title}
          </p>
          <p className="text-xs text-[#537FAF] leading-relaxed">
            {feature.description}
          </p>
        </Card>
      ))}
    </div>
  );
}

/* ─── Empty State ─────────────────────────────────────────────────── */
function EmptyState() {
  return (
    <Card
      variant="flat"
      padding="lg"
      className="flex flex-col items-center justify-center text-center"
    >
      <div className="w-14 h-14 rounded-full bg-[#C2E8FF] flex items-center justify-center mb-4">
        <Clock size={22} className="text-[#557EB2]" />
      </div>
      <p className="text-sm font-semibold text-[#000F22] mb-1">
        No activity yet
      </p>
      <p className="text-xs text-[#537FAF] max-w-xs">
        Generate your first career roadmap to begin your journey.
      </p>
    </Card>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────── */
export default function DashboardPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: latestRoadmap, isLoading: roadmapLoading } = useLatestRoadmap();

  /* Auth guard */
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

  const isLoading = profileLoading || roadmapLoading;

  return (
    <div className="min-h-screen bg-[#C2E8FF] flex">
      <Sidebar />

      <main className="flex-1 min-w-0 max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col gap-5">
          {/* Welcome Section */}
          <div className="animate-fade-up">
            <h1 className="font-display text-[#000F22] text-2xl sm:text-3xl">
              {profileLoading
                ? "Welcome back"
                : `Good day, ${profile?.name?.split(" ")[0] ?? "there"}`}
            </h1>
            <p className="text-sm text-[#537FAF] mt-0.5">
              {latestRoadmap
                ? "Continue your career journey with your personalized roadmap."
                : profile?.isProfileComplete
                  ? "Generate your career roadmap to get started."
                  : "Complete your profile to unlock personalized career guidance."}
            </p>
          </div>

          {/* Profile Completion Banner */}
          {!profileLoading && profile && !profile.isProfileComplete && (
            <div className="animate-fade-up delay-1">
              <ProfileCompletionBanner profile={profile} />
            </div>
          )}

          {/* Quick Stats */}
          <div className="animate-fade-up delay-1">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
            ) : (
              <QuickStats profile={profile} />
            )}
          </div>

          {/* Main Content */}
          {isLoading ? (
            <div className="flex flex-col gap-4 animate-fade-up delay-2">
              <Skeleton className="h-64" />
              <Skeleton className="h-40" />
            </div>
          ) : profile?.isProfileComplete ? (
            latestRoadmap ? (
              /* Has Roadmap */
              <div className="animate-fade-up delay-2">
                <RoadmapPreview roadmap={latestRoadmap} />
              </div>
            ) : (
              /* Profile Complete but No Roadmap */
              <div className="animate-fade-up delay-2 flex flex-col gap-4">
                <GenerateRoadmapCTA userName={profile.name} />
                <FeatureCards />
              </div>
            )
          ) : (
            /* Profile Incomplete */
            <div className="animate-fade-up delay-2 flex flex-col gap-4">
              <Card variant="flat" padding="lg" className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#C2E8FF] flex items-center justify-center mx-auto mb-4">
                  <BriefcaseBusiness size={22} className="text-[#557EB2]" />
                </div>
                <p className="text-sm font-semibold text-[#000F22] mb-1">
                  Complete your profile first
                </p>
                <p className="text-xs text-[#537FAF] max-w-md mx-auto mb-4">
                  Add your career preferences and skill set to receive a
                  personalized roadmap.
                </p>
                <Link href="/register/step2">
                  <Button variant="primary" size="md">
                    Complete Profile
                  </Button>
                </Link>
              </Card>
              <FeatureCards />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
