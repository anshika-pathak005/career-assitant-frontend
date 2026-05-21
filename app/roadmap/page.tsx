// app/roadmap/page.tsx

"use client";

import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  MapIcon,
  Calendar,
  TrendingUp,
  Plus,
  Target,
  Clock,
  FileText,
  Upload,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { useUserRoadmaps } from "@/hooks/useRoadmap";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useEffect, useState } from "react";
import ConfirmModal from "@/components/ui/ConfirmModal";

/* ─── Skeleton Loader ───────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-[#7A9BC4]/20 p-5 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="h-5 bg-[#C2E8FF] rounded w-40" />
        <div className="h-5 bg-[#C2E8FF] rounded w-16" />
      </div>
      <div className="h-3 bg-[#C2E8FF] rounded w-32 mb-4" />
      <div className="h-2 bg-[#C2E8FF] rounded-full mb-3" />
      <div className="h-8 bg-[#C2E8FF] rounded w-32" />
    </div>
  );
}

/* ─── Hero CTA Card with Usage Card Inside ───────────────────────── */
function HeroCTA({ userName, generationLimit }: { userName: string; generationLimit: any }) {
  const router = useRouter();
  const limitReached = generationLimit?.limitReached || false;
  const used = generationLimit?.used || 0;
  const total = generationLimit?.total || 3;
  const remaining = generationLimit?.remaining || 0;
  const percentage = (used / total) * 100;

  return (
    <div className="space-y-4">
      {/* Main CTA Card */}
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
              Ai Powered Career Roadmap
            </span>
          </div>

          <h2 className="font-display text-white text-2xl sm:text-3xl lg:text-4xl mb-3">
            Create your personalized roadmap, {userName?.split(" ")[0]}
          </h2>

          <p className="text-[#7A9BC4] text-sm sm:text-base max-w-md mb-6 leading-relaxed">
            Get a step-by-step learning plan tailored to your dream job, skills,
            and experience level. Track your progress and stay on course.
          </p>
          <Button
            onClick={() => router.push("/roadmap/generate")}
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight size={16} />}
            disabled={limitReached}
          >
            Generate New Roadmap
          </Button>
        </div>
      </Card>

      {/* Usage Card - Inside same component */}
      <Card
        variant="flat"
        padding="sm"
        className="border border-[#7A9BC4]/20 bg-white/50"
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C2E8FF] flex items-center justify-center">
              <Target size={14} className="text-[#557EB2]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#042558]">
                Monthly Roadmap Limit
              </p>
              <p className="text-xs text-[#537FAF]">
                {used} / {total} roadmaps used this month
              </p>
            </div>
          </div>

          {limitReached && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/pricing")}
              className="bg-[#000F22] text-white hover:bg-[#042558]"
            >
              Upgrade to Get More
            </Button>
          )}
        </div>

        <div className="mt-2 h-1.5 bg-[#C2E8FF] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#557EB2] rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-[10px] text-[#7A9BC4] mt-1.5">
          {limitReached
            ? `Resets on ${new Date(generationLimit.resetsOn).toLocaleDateString()}`
            : `${remaining} generation${remaining !== 1 ? "s" : ""} remaining this month`}
        </p>
      </Card>
    </div>
  );
}

/* ─── Empty State ───────────────────────────────────────────────── */
function EmptyState() {
  const router = useRouter();

  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-full bg-[#C2E8FF] flex items-center justify-center mx-auto mb-4">
        <MapIcon size={24} className="text-[#557EB2]" />
      </div>
      <h3 className="font-display text-[#000F22] text-xl mb-2">
        No roadmaps yet
      </h3>
      <p className="text-sm text-[#537FAF] max-w-md mx-auto mb-6">
        Generate your first career roadmap to start your journey.
      </p>
      <Button
        variant="primary"
        onClick={() => router.push("/roadmap/generate")}
      >
        Generate Your First Roadmap
      </Button>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function RoadmapListPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: profile } = useUserProfile();
  const { data: roadmaps, isLoading: roadmapsLoading } = useUserRoadmaps();
  const router = useRouter();

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

  const isLoading = roadmapsLoading;

  const remainingGenerations = profile?.generationLimit?.remaining ?? 3;
  const limitReached = profile?.generationLimit?.limitReached ?? false;

  return (
    <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero CTA Card */}
        {profile && (
          <div className="mb-8">
            <HeroCTA
              userName={profile.name}
              generationLimit={profile.generationLimit}
            />
          </div>
        )}

        {/* Roadmaps Section */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-[#000F22] text-2xl">
                My Roadmaps
              </h1>
              <p className="text-sm text-[#537FAF] mt-0.5">
                Track and continue your learning journeys
              </p>
            </div>
            {!limitReached && (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Plus size={14} />}
                onClick={() => router.push("/roadmap/generate")}
              >
                New Roadmap
              </Button>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && (!roadmaps || roadmaps.length === 0) && <EmptyState />}

          {/* Roadmaps List */}
          {!isLoading && roadmaps && roadmaps.length > 0 && (
            <div className="space-y-3">
              {roadmaps.map((roadmap) => (
                <RoadmapHistoryCard key={roadmap.roadmapId} roadmap={roadmap} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Roadmap History Card Component with Confirmation ──────────── */
function RoadmapHistoryCard({ roadmap }: { roadmap: any }) {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const formattedDate = new Date(roadmap.generatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <span className="text-[10px] font-semibold text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded-full">Active</span>;
      case "COMPLETED":
        return <span className="text-[10px] font-semibold text-[#557EB2] bg-[#C2E8FF] px-2 py-0.5 rounded-full">Completed</span>;
      default:
        return <span className="text-[10px] font-semibold text-[#7A9BC4] bg-[#C2E8FF] px-2 py-0.5 rounded-full">{status}</span>;
    }
  };

  const progress = roadmap.overallProgress || 0;
  const isCompleted = progress === 100;
  const isActive = roadmap.status === "ACTIVE";

  const handleClick = () => {
    // If roadmap is ACTIVE, navigate directly
    if (isActive) {
      router.push(`/roadmap/${roadmap.roadmapId}`);
    } else {
      // Show confirmation for non-active (completed/archived)
      setShowConfirmModal(true);
    }
  };

  const handleConfirm = () => {
    router.push(`/roadmap/${roadmap.roadmapId}`);
  };

  return (
    <>
      <Card variant="default" padding="md" className="hover:shadow-lg transition-all duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-[#000F22] text-lg">
                {roadmap.dreamJob}
              </h3>
              {getStatusBadge(roadmap.status)}
            </div>
            
            <div className="flex items-center gap-3 text-xs text-[#537FAF] mb-3">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp size={12} />
                {roadmap.totalEstimatedWeeks} weeks
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-xs">
              <div className="flex justify-between text-[10px] text-[#537FAF] mb-1">
                <span>Completion</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 bg-[#C2E8FF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#557EB2] rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Button */}
          <Button
            variant={isCompleted ? "ghost" : "primary"}
            size="md"
            rightIcon={<ArrowRight size={14} />}
            onClick={handleClick}
            className={isCompleted ? "text-[#000F22]" : ""}
          >
            {isCompleted ? "View Roadmap" : "Continue Learning"}
          </Button>
        </div>
      </Card>

      {/* Confirmation Modal for non-active roadmaps */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
        title="Switch to this roadmap?"
        message={`You're about to switch to "${roadmap.dreamJob}" roadmap. Your current progress will be saved. You can always come back.`}
        confirmText="Yes, Switch Roadmap"
        cancelText="Cancel"
        icon={
          <div className="w-10 h-10 rounded-full bg-[#C2E8FF] flex items-center justify-center">
            <Target size={20} className="text-[#557EB2]" />
          </div>
        }
      />
    </>
  );
}
