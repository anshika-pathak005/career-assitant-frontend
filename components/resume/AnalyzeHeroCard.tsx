// components/resume/AnalyzeHeroCard.tsx

"use client";

import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ResumeUsageCard from "./ResumeUsageCard";
import type { GenerationLimit } from "@/types/profile.types";

interface Props {
  userName: string;
  resumeUsage?: GenerationLimit;
}

/** Dark hero + the quota card beneath it, shown at the top of /resume-analysis. */
export default function AnalyzeHeroCard({ userName, resumeUsage }: Props) {
  const router = useRouter();
  const limitReached = resumeUsage?.limitReached ?? false;

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
              Ai Powered Resume Analysis
            </span>
          </div>

          <h2 className="font-display text-white text-2xl sm:text-3xl lg:text-4xl mb-3">
            Get your resume analyzed, {userName?.split(" ")[0]}
          </h2>

          <p className="text-brand-accent-lt text-sm sm:text-base max-w-md mb-6 leading-relaxed">
            Upload your resume to get detailed ATS score, skill gap analysis,
            and personalized recommendations to improve your chances.
          </p>
          <Button
            onClick={() => router.push("/resume-analysis/analyze")}
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight size={16} />}
            disabled={limitReached}
          >
            Analyze New Resume
          </Button>
        </div>
      </Card>

      <ResumeUsageCard usage={resumeUsage} />
    </div>
  );
}
