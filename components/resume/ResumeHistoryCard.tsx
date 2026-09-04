// components/resume/ResumeHistoryCard.tsx

"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Calendar, Award } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ScoreRing from "./ScoreRing";
import { getScoreColor } from "@/utils/score";
import type { ResumeSummary } from "@/types/resume.types";

const readinessStyles: Record<string, string> = {
  advanced: "text-brand-success bg-brand-success/10",
  intermediate: "text-brand-accent bg-brand-bg",
};

/** One row in the resume analysis history list. */
export default function ResumeHistoryCard({
  resume,
}: {
  resume: ResumeSummary;
}) {
  const router = useRouter();

  const formattedDate = new Date(resume.uploadedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const readiness = resume.interviewReadiness || "Beginner";
  const badgeStyle =
    readinessStyles[readiness.toLowerCase()] ??
    "text-brand-accent-lt bg-brand-bg";

  const overallScore = resume.overallScore || 0;
  const atsScore = resume.atsScore || 0;

  return (
    <Card
      variant="default"
      padding="md"
      className="hover:shadow-lg transition-all duration-200"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-brand-primary text-lg">
              {resume.fileName}
            </h3>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeStyle}`}
            >
              {readiness}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-brand-muted mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Award size={12} />
              {resume.experienceLevel || "Entry"} Level
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ScoreRing
              size="sm"
              value={overallScore}
              label="Overall"
              color={getScoreColor(overallScore)}
            />
            <ScoreRing
              size="sm"
              value={atsScore}
              label="ATS Score"
              color={getScoreColor(atsScore)}
            />
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          rightIcon={<ArrowRight size={14} />}
          onClick={() => router.push(`/resume-analysis/${resume.resumeId}`)}
          className="flex-shrink-0 bg-brand-primary text-white hover:bg-brand-secondary"
        >
          View Analysis
        </Button>
      </div>
    </Card>
  );
}
