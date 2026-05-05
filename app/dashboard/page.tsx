"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Sparkles,
  Clock,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import ProfileCompletionBanner from "@/components/dashboard/ProfileCompletionBanner";
import GetStartedCTA from "@/components/dashboard/GetStartedCTA";
import AnalysisOverviewCard from "@/components/dashboard/AnalysisOverviewCard";
import RoadmapPreviewCard from "@/components/dashboard/RoadmapPreviewCard";
import QuickStatsRow from "@/components/dashboard/QuickStatsRow";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useLatestAnalysis } from "@/hooks/useResumeAnalysis";

/* ─── Loading skeleton ───────────────────────────────────────────── */
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#C2E8FF]/60 rounded-lg animate-pulse ${className}`} />
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: latestAnalysis, isLoading: analysisLoading } =
    useLatestAnalysis();

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

  /* ── Build dynamic stats ─────────────────────────────────────── */
  const stats = [
    {
      label: "Overall Score",
      value: latestAnalysis ? `${latestAnalysis.analysis.overallScore}%` : "—",
      icon: BarChart3,
      iconColor: "#557EB2",
      iconBg: "rgba(85,126,178,0.12)",
      trend: latestAnalysis ? "New" : undefined,
    },
    {
      label: "ATS Score",
      value: latestAnalysis ? `${latestAnalysis.analysis.atsScore}%` : "—",
      icon: FileText,
      iconColor: "#042558",
      iconBg: "rgba(4,37,88,0.08)",
    },
    {
      label: "Skill Gaps",
      value: latestAnalysis
        ? latestAnalysis.analysis.missingSkills.length
        : "—",
      icon: TrendingUp,
      iconColor: "#D97706",
      iconBg: "rgba(217,119,6,0.10)",
    },
    {
      label: "AI Chat",
      value: "0",
      icon: MessageSquare,
      iconColor: "#7A9BC4",
      iconBg: "rgba(122,155,196,0.12)",
    },
  ];

  const isPageLoading = profileLoading || analysisLoading;

  return (
    <div className="min-h-screen bg-[#C2E8FF] flex flex-col">
      {/* <Navbar /> */}

      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 gap-6 py-6">
        <Sidebar />

        <main className="flex-1 min-w-0 flex flex-col gap-5">
          {/* ── Welcome ───────────────────────────────────────── */}
          <div className="animate-fade-up">
            <h1 className="font-display text-[#000F22] text-2xl sm:text-3xl">
              {profileLoading
                ? "Welcome back"
                : `Good day, ${profile?.name?.split(" ")[0] ?? "there"}`}
            </h1>
            <p className="text-sm text-[#537FAF] mt-0.5">
              {latestAnalysis
                ? "Your latest career analysis is ready below."
                : "Let's build your personalized career roadmap today."}
            </p>
          </div>

          {/* ── Profile completion banner ──────────────────────── */}
          {!profileLoading && profile && !profile.isProfileComplete && (
            <div className="animate-fade-up delay-1">
              <ProfileCompletionBanner profile={profile} />
            </div>
          )}

          {/* ── Stats row ─────────────────────────────────────── */}
          <div className="animate-fade-up delay-1">
            {isPageLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-28" />
                ))}
              </div>
            ) : (
              <QuickStatsRow stats={stats} />
            )}
          </div>

          {/* ── Main content area ──────────────────────────────── */}
          {isPageLoading ? (
            <div className="flex flex-col gap-4 animate-fade-up delay-2">
              <Skeleton className="h-48" />
              <Skeleton className="h-36" />
            </div>
          ) : latestAnalysis ? (
            /* ── Has analysis — show overview ──────────────── */
            <div className="animate-fade-up delay-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <AnalysisOverviewCard data={latestAnalysis} />
              <div className="flex flex-col gap-4">
                <RoadmapPreviewCard
                  steps={latestAnalysis.careerGuidance.learningRoadmap}
                  resumeId={latestAnalysis.resumeId}
                />
                {/* Recommended roles */}
                <div className="bg-white rounded-xl border border-[#7A9BC4]/20 shadow-card p-5">
                  <p className="font-bold text-[#000F22] text-sm mb-3">
                    Recommended Roles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {latestAnalysis.careerGuidance.recommendedRoles.map(
                      (role) => (
                        <span
                          key={role}
                          className="text-xs font-semibold text-[#042558] bg-[#C2E8FF] border border-[#7A9BC4]/30 px-3 py-1.5 rounded-full"
                        >
                          {role}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ── No analysis yet — show CTA ────────────────── */
            <div className="animate-fade-up delay-2 flex flex-col gap-4">
              {profile && <GetStartedCTA userName={profile.name} />}

              {/* Feature teasers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    icon: FileText,
                    title: "ATS Resume Score",
                    desc: "See how recruiters' systems rate your resume.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Skill Gap Report",
                    desc: "Know exactly what to learn for your dream role.",
                  },
                  {
                    icon: Sparkles,
                    title: "AI Career Roadmap",
                    desc: "Step-by-step plan tailored to your goals.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="bg-white rounded-xl border border-[#7A9BC4]/20 shadow-card p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="w-9 h-9 bg-[#C2E8FF] rounded-lg flex items-center justify-center mb-3">
                      <Icon size={17} className="text-[#557EB2]" />
                    </div>
                    <p className="font-bold text-[#000F22] text-sm mb-1">
                      {title}
                    </p>
                    <p className="text-xs text-[#537FAF] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Empty activity state */}
              <div className="bg-white rounded-xl border border-[#7A9BC4]/20 shadow-card flex flex-col items-center justify-center py-10 gap-3">
                <div className="w-11 h-11 bg-[#C2E8FF] rounded-full flex items-center justify-center">
                  <Clock size={19} className="text-[#557EB2]" />
                </div>
                <p className="text-sm font-bold text-[#000F22]">
                  No activity yet
                </p>
                <p className="text-xs text-[#537FAF] text-center max-w-xs">
                  Complete your first career analysis to see your activity here.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
