// components/roadmap/LimitReachedScreen.tsx

"use client";

import { useRouter } from "next/navigation";
import { AlertCircle, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { GenerationLimit } from "@/types/profile.types";

interface LimitReachedScreenProps {
  limit: GenerationLimit;
}

/**
 * Shown when the user has used every roadmap generation in their
 * monthly quota. Offers an upgrade path and a way back out.
 */
export default function LimitReachedScreen({
  limit,
}: LimitReachedScreenProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <Card
        variant="default"
        padding="lg"
        className="max-w-md text-center shadow-xl"
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <AlertCircle size={28} className="text-amber-600" />
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl font-bold text-brand-primary mb-2">
          Monthly generation limit reached
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-brand-muted mb-6 leading-relaxed">
          You&apos;ve used all{" "}
          <span className="font-bold text-brand-primary">{limit.total}</span> free
          roadmap generations this month. Upgrade to unlock unlimited roadmaps
          and accelerate your career journey.
        </p>

        {/* Stats Card */}
        <div className="bg-brand-bg/50 rounded-lg p-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-brand-muted">Used this month</span>
            <span className="font-semibold text-brand-primary">
              {limit.used} / {limit.total}
            </span>
          </div>
          <div className="h-2 bg-brand-bg rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-accent rounded-full"
              style={{ width: "100%" }}
            />
          </div>
          <p className="text-xs text-brand-accent-lt mt-3">
            Resets on{" "}
            {new Date(limit.resetsOn).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Upgrade CTA */}
        <Button
          variant="primary"
          size="lg"
          className="w-full mb-3"
          onClick={() => router.push("/pricing")}
          rightIcon={<Sparkles size={16} />}
        >
          Upgrade to Pro – Unlimited Roadmaps
        </Button>

        {/* Secondary action */}
        <Button
          variant="ghost"
          size="md"
          className="w-full"
          onClick={() => router.push("/dashboard")}
        >
          Back to Dashboard
        </Button>

        {/* Small note */}
        <p className="text-[10px] text-brand-accent-lt mt-4">
          Already upgraded? Contact support for assistance.
        </p>
      </Card>
    </div>
  );
}
