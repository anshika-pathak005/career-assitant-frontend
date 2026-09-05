// components/dashboard/GenerateRoadmapCTA.tsx

"use client";

import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

/** Dark hero card shown when the user has a complete profile but no roadmap yet. */
export default function GenerateRoadmapCTA({ userName }: { userName: string }) {
  const router = useRouter();

  return (
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
          <span className="text-2xs font-medium text-brand-accent-lt uppercase tracking-wider">
            Ai Powered
          </span>
        </div>

        <h2 className="hero-title mb-3">
          Transform your career journey, {userName?.split(" ")[0]}
        </h2>

        <p className="text-brand-accent-lt text-base max-w-md mb-6 leading-relaxed">
          Generate a comprehensive, step-by-step roadmap tailored to your
          skills, experience, and career aspirations.
        </p>

        <Button
          onClick={() => router.push("/roadmap/generate")}
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight size={16} />}
        >
          Generate Roadmap
        </Button>
      </div>
    </Card>
  );
}
