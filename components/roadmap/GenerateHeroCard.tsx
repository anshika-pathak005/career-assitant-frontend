// components/roadmap/GenerateHeroCard.tsx

"use client";

import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import UsageCard from "./UsageCard";
import type { GenerationLimit } from "@/types/profile.types";

interface Props {
  userName: string;
  generationLimit?: GenerationLimit;
}

/** Dark hero + the quota card beneath it, shown at the top of /roadmap. */
export default function GenerateHeroCard({ userName, generationLimit }: Props) {
  const router = useRouter();
  const limitReached = generationLimit?.limitReached ?? false;

  return (
    <div className="space-y-4">
      <Card
        variant="flat"
        padding="lg"
        className="relative overflow-hidden bg-gradient-to-br from-brand-primary to-brand-secondary border-none"
      >
        <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-accent-lt/10 blur-2xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-5">
            <Sparkles size={14} className="text-brand-accent-lt" />
            <span className="text-[11px] font-medium text-brand-accent-lt uppercase tracking-wider">
              Ai Powered Career Roadmap
            </span>
          </div>

          <h2 className="font-display text-white text-2xl sm:text-3xl lg:text-4xl mb-3">
            Create your personalized roadmap, {userName?.split(" ")[0]}
          </h2>

          <p className="text-brand-accent-lt text-sm sm:text-base max-w-md mb-6 leading-relaxed">
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

      <UsageCard limit={generationLimit} />
    </div>
  );
}
