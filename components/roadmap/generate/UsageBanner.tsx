// components/roadmap/generate/UsageBanner.tsx

import { Sparkles } from "lucide-react";
import Card from "@/components/ui/Card";
import type { GenerationLimit } from "@/types/profile.types";

interface UsageBannerProps {
  limit: GenerationLimit;
}

/** Thin progress strip showing how many generations remain this month. */
export default function UsageBanner({ limit }: UsageBannerProps) {
  return (
    <div className="mb-6">
      <Card
        variant="flat"
        padding="sm"
        className="border border-brand-accent-lt/15 bg-white/50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-brand-accent" />
            <span className="text-xs font-medium text-brand-secondary">
              {limit.remaining} of {limit.total} roadmap generations left this
              month
            </span>
          </div>
          {limit.remaining <= 1 && (
            <span className="text-2xs text-brand-accent-lt">
              Resets on{" "}
              {new Date(limit.resetsOn).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>
        <div className="mt-1.5 h-1 bg-brand-bg rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-accent-lt rounded-full"
            style={{ width: `${(limit.used / limit.total) * 100}%` }}
          />
        </div>
      </Card>
    </div>
  );
}
