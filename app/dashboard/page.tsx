// app/dashboard/page.tsx

"use client";

import { FileText, Target } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import ProfileCompletionBanner from "@/components/dashboard/ProfileCompletionBanner";
import FeatureShowcase from "@/components/dashboard/FeatureShowcase";
import Skeleton from "@/components/dashboard/Skeleton";
import StatsSummary from "@/components/dashboard/StatsSummary";
import UsageLimitCard from "@/components/dashboard/UsageLimitCard";
import ActiveRoadmapCard from "@/components/dashboard/ActiveRoadmapCard";
import LatestResumeCard from "@/components/dashboard/LatestResumeCard";
import GenerateRoadmapCTA from "@/components/dashboard/GenerateRoadmapCTA";
import { useDashboard } from "@/hooks/useDashboard";
import { useUserProfile } from "@/hooks/useUserProfile";

// Auth is handled by useRouteGuard in ClientLayoutWrapper - this page only
// renders once the guard has confirmed the user is logged in.
export default function DashboardPage() {
  const { data: dashboard, isLoading: dashboardLoading } = useDashboard();
  const { data: profile, isLoading: profileLoading } = useUserProfile();

  const isLoading = dashboardLoading || profileLoading;
  const firstName = dashboard?.user?.name?.split(" ")[0] ?? "there";

  // Profile incomplete - show the banner instead of the real dashboard
  if (!isLoading && profile && !profile.isProfileComplete) {
    return (
      <div className="min-h-screen bg-brand-bg flex">
        <Sidebar />
        <main className="flex-1 min-w-0 max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col gap-5">
            <div className="animate-fade-up">
              <h1 className="font-display text-brand-primary text-2xl sm:text-3xl">
                Good day, {profile?.name?.split(" ")[0] ?? "there"}
              </h1>
              <p className="text-sm text-brand-muted mt-0.5">
                Complete your profile to unlock personalized career guidance.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="animate-fade-up delay-1">
                <ProfileCompletionBanner profile={profile} />
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
    <div className="min-h-screen bg-brand-bg flex">
      <Sidebar />

      <main className="flex-1 min-w-0 max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col gap-5">
          {/* Welcome Section */}
          <div className="animate-fade-up">
            <h1 className="font-display text-brand-primary text-2xl sm:text-3xl">
              {isLoading ? "Welcome back" : `Good day, ${firstName}`}
            </h1>
            <p className="text-sm text-brand-muted mt-0.5">
              {dashboard?.roadmap
                ? "Continue your career journey with your personalized roadmap."
                : "Generate your career roadmap to get started."}
            </p>
          </div>

          {/* Monthly quotas */}
          {!isLoading && dashboard && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up delay-1">
              <UsageLimitCard
                label="Roadmap Limit this Month"
                icon={Target}
                limit={dashboard.limits.roadmapLimit}
              />
              <UsageLimitCard
                label="Resume Limit this Month"
                icon={FileText}
                limit={dashboard.limits.resumeLimit}
              />
            </div>
          )}

          {/* Stats Summary */}
          {!isLoading && dashboard && (
            <div className="animate-fade-up delay-1">
              <StatsSummary stats={dashboard.stats} />
            </div>
          )}

          {/* Main Content */}
          {isLoading ? (
            <div className="flex flex-col gap-4 animate-fade-up delay-2">
              <Skeleton className="h-64" />
              <Skeleton className="h-40" />
            </div>
          ) : dashboard?.roadmap ? (
            /* Has Roadmap */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-up delay-2">
              <ActiveRoadmapCard roadmap={dashboard.roadmap} />
              {dashboard.resume && (
                <LatestResumeCard resume={dashboard.resume} />
              )}
            </div>
          ) : (
            /* Profile Complete but No Roadmap */
            <div className="animate-fade-up delay-2 flex flex-col gap-4">
              <GenerateRoadmapCTA userName={dashboard?.user?.name || ""} />
              <FeatureShowcase />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
