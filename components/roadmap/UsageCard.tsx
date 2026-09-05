// components/roadmap/UsageCard.tsx

"use client";

import { useRouter } from "next/navigation";
import { Target } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { GenerationLimit } from "@/types/profile.types";

/** Monthly roadmap quota with progress bar and upgrade prompt. */
export default function UsageCard({ limit }: { limit?: GenerationLimit }) {
  const router = useRouter();

  const used = limit?.used ?? 0;
  const total = limit?.total ?? 3;
  const remaining = limit?.remaining ?? 0;
  const limitReached = limit?.limitReached ?? false;
  // Guard against total === 0 so the bar never gets width: NaN%
  const percentage = total > 0 ? (used / total) * 100 : 0;

  return (
    <Card
      variant="flat"
      padding="sm"
      className="border border-brand-accent-lt/20 bg-white/50"
    >
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center">
            <Target size={14} className="text-brand-accent" />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-secondary">
              Monthly Roadmap Limit
            </p>
            <p className="meta-text">
              {used} / {total} roadmaps used this month
            </p>
          </div>
        </div>

        {limitReached && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/pricing")}
            className="bg-brand-primary text-white hover:bg-brand-secondary"
          >
            Upgrade to Get More
          </Button>
        )}
      </div>

      <div className="mt-2 h-1.5 bg-brand-bg rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-accent rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-2xs text-brand-accent-lt mt-1.5">
        {limitReached && limit
          ? `Resets on ${new Date(limit.resetsOn).toLocaleDateString()}`
          : `${remaining} generation${remaining !== 1 ? "s" : ""} remaining this month`}
      </p>
    </Card>
  );
}
