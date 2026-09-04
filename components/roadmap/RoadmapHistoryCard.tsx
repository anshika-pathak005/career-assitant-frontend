// components/roadmap/RoadmapHistoryCard.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Calendar, TrendingUp, Target } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ConfirmModal from "@/components/ui/ConfirmModal";
import type { Roadmap } from "@/types/roadmap.types";

const statusStyles: Record<string, string> = {
  ACTIVE: "text-brand-success bg-brand-success/10",
  COMPLETED: "text-brand-accent bg-brand-bg",
};

/** One row in the roadmap history list. */
export default function RoadmapHistoryCard({ roadmap }: { roadmap: Roadmap }) {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const formattedDate = new Date(roadmap.generatedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const progress = roadmap.overallProgress || 0;
  const isCompleted = progress === 100;
  const isActive = roadmap.status === "ACTIVE";

  const statusLabel =
    roadmap.status === "ACTIVE"
      ? "Active"
      : roadmap.status === "COMPLETED"
        ? "Completed"
        : roadmap.status;

  const handleClick = () => {
    // Active roadmaps open straight away; switching to an old one asks first
    if (isActive) {
      router.push(`/roadmap/${roadmap.roadmapId}`);
    } else {
      setShowConfirmModal(true);
    }
  };

  return (
    <>
      <Card
        variant="default"
        padding="md"
        className="hover:shadow-lg transition-all duration-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-brand-primary text-lg">
                {roadmap.dreamJob}
              </h3>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  statusStyles[roadmap.status] ??
                  "text-brand-accent-lt bg-brand-bg"
                }`}
              >
                {statusLabel}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-brand-muted mb-3">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp size={12} />
                {roadmap.totalEstimatedWeeks} weeks
              </span>
            </div>

            <div className="w-full max-w-xs">
              <div className="flex justify-between text-[10px] text-brand-muted mb-1">
                <span>Completion</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 bg-brand-bg rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-accent rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <Button
            variant={isCompleted ? "ghost" : "primary"}
            size="md"
            rightIcon={<ArrowRight size={14} />}
            onClick={handleClick}
            className={isCompleted ? "text-brand-primary" : ""}
          >
            {isCompleted ? "View Roadmap" : "Continue Learning"}
          </Button>
        </div>
      </Card>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => router.push(`/roadmap/${roadmap.roadmapId}`)}
        title="Switch to this roadmap?"
        message={`You're about to switch to "${roadmap.dreamJob}" roadmap. Your current progress will be saved. You can always come back.`}
        confirmText="Yes, Switch Roadmap"
        cancelText="Cancel"
        icon={
          <div className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center">
            <Target size={20} className="text-brand-accent" />
          </div>
        }
      />
    </>
  );
}
