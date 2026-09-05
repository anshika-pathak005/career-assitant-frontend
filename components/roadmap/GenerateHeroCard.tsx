// components/roadmap/GenerateHeroCard.tsx

"use client";

import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import HeroBadge from "@/components/ui/HeroBadge";
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
          <HeroBadge icon={Sparkles} className="mb-4">
            AI powered career roadmap
          </HeroBadge>

          <h2 className="hero-title mb-3">
            Create your personalized roadmap, {userName?.split(" ")[0]}
          </h2>

          <p className="hero-subtitle mb-6">
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
