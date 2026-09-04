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
        className="border border-[#7A9BC4]/15 bg-white/50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#557EB2]" />
            <span className="text-xs font-medium text-[#042558]">
              {limit.remaining} of {limit.total} roadmap generations left this
              month
            </span>
          </div>
          {limit.remaining <= 1 && (
            <span className="text-[10px] text-[#7A9BC4]">
              Resets on{" "}
              {new Date(limit.resetsOn).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>
        <div className="mt-1.5 h-1 bg-[#C2E8FF] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#7A9BC4] rounded-full"
            style={{ width: `${(limit.used / limit.total) * 100}%` }}
          />
        </div>
      </Card>
    </div>
  );
}
