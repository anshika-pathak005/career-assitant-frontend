// app/roadmap/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { MapIcon, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import SkeletonCard from "@/components/ui/SkeletonCard";
import GenerateHeroCard from "@/components/roadmap/GenerateHeroCard";
import RoadmapHistoryCard from "@/components/roadmap/RoadmapHistoryCard";
import { useUserRoadmaps } from "@/hooks/useRoadmap";
import { useUserProfile } from "@/hooks/useUserProfile";

// Auth is handled by useRouteGuard in ClientLayoutWrapper - this page only
// renders once the guard has confirmed the user is logged in.
export default function RoadmapListPage() {
  const router = useRouter();
  const { data: profile } = useUserProfile();
  const { data: roadmaps, isLoading } = useUserRoadmaps();

  const limitReached = profile?.generationLimit?.limitReached ?? false;
  const hasRoadmaps = !isLoading && roadmaps && roadmaps.length > 0;

  return (
    <div className="min-h-screen bg-brand-bg py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {profile && (
          <div className="mb-8">
            <GenerateHeroCard
              userName={profile.name}
              generationLimit={profile.generationLimit}
            />
          </div>
        )}

        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-brand-primary text-2xl">
                My Roadmaps
              </h1>
              <p className="text-sm text-brand-muted mt-0.5">
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

          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {!isLoading && !hasRoadmaps && (
            <EmptyState
              icon={MapIcon}
              title="No roadmaps yet"
              description="Generate your first career roadmap to start your journey."
              action={
                <Button
                  variant="primary"
                  onClick={() => router.push("/roadmap/generate")}
                >
                  Generate Your First Roadmap
                </Button>
              }
            />
          )}

          {hasRoadmaps && (
            <div className="space-y-3">
              {roadmaps.map((roadmap) => (
                <RoadmapHistoryCard
                  key={roadmap.roadmapId}
                  roadmap={roadmap}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
