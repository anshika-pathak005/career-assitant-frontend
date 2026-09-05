// components/dashboard/LatestResumeCard.tsx

"use client";

import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import Card from "@/components/ui/Card";
import { getScoreColor } from "@/utils/score";
import type { ResumeData } from "@/types/dashboard.types";

/** Latest resume analysis summary. Clicking anywhere opens the full analysis. */
export default function LatestResumeCard({ resume }: { resume: ResumeData }) {
  const router = useRouter();

  // Get missing skills from analysis object
  const missingSkills = resume.analysis?.missingSkills || [];
  const topMissingSkills = missingSkills.slice(0, 3);

  return (
    <Card
      variant="default"
      padding="md"
      className="cursor-pointer hover:shadow-lg transition-all duration-200"
      onClick={() => router.push(`/resume-analysis/${resume.resumeId}`)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-brand-accent" />
          <p className="text-xs font-medium uppercase tracking-wider text-brand-accent">
            Latest Analysis
          </p>
        </div>
        <span className="text-2xs font-medium text-brand-muted">
          {new Date(resume.uploadedAt).toLocaleDateString()}
        </span>
      </div>

      <p className="font-semibold text-brand-primary text-sm mb-1 truncate">
        {resume.fileName}
      </p>

      {/* Experience Level Badge */}
      {resume.basicInfo?.experienceLevel && (
        <div className="mb-2">
          <span className="text-3xs font-medium text-brand-accent bg-brand-bg px-2 py-0.5 rounded-full">
            {resume.basicInfo.experienceLevel} Level
          </span>
        </div>
      )}

      {/* Resume Verdict / Summary */}
      {resume.resumeVerdict && (
        <p className="text-xs text-brand-muted leading-relaxed mb-3 line-clamp-2">
          {resume.resumeVerdict}
        </p>
      )}

      {/* Scores */}
      <div className="flex items-center gap-4 mb-3">
        <div className="text-center">
          <p
            className="text-xl font-bold"
            style={{ color: getScoreColor(resume.overallScore) }}
          >
            {resume.overallScore}
          </p>
          <p className="text-3xs text-brand-muted">Overall</p>
        </div>
        <div className="text-center">
          <p
            className="text-xl font-bold"
            style={{ color: getScoreColor(resume.atsScore) }}
          >
            {resume.atsScore}
          </p>
          <p className="text-3xs text-brand-muted">ATS Score</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-brand-primary">
            {resume.interviewReadiness || resume.basicInfo?.interviewReadiness || "Beginner"}
          </p>
          <p className="text-3xs text-brand-muted">Readiness</p>
        </div>
      </div>

      {/* Missing Skills */}
      {topMissingSkills.length > 0 && (
        <div className="mt-2 pt-2 border-t border-brand-accent-lt/15">
          <p className="text-3xs font-semibold text-brand-warning mb-1.5">
            Missing Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {topMissingSkills.map((skill) => (
              <span
                key={skill}
                className="text-3xs text-brand-warning bg-brand-warning/10 px-1.5 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
            {missingSkills.length > 3 && (
              <span className="text-3xs text-brand-muted">
                +{missingSkills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
