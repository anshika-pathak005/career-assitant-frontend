// components/resume/AnalysisHero.tsx

import { FileText, Calendar, BriefcaseBusiness, Award } from "lucide-react";
import Card from "@/components/ui/Card";

interface Props {
  fileName: string;
  fullName?: string;
  verdict: string;
  currentRole?: string;
  interviewReadiness: string;
  formattedDate: string;
}

/** Top banner: file name, candidate name, verdict, date and readiness badge. */
export default function AnalysisHero({
  fileName,
  fullName,
  verdict,
  currentRole,
  interviewReadiness,
  formattedDate,
}: Props) {
  return (
    <Card variant="default" padding="lg" className="mb-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={16} className="text-brand-accent" />
            <span className="text-xs font-medium text-brand-accent">
              {fileName}
            </span>
          </div>
          <h1 className="page-title mb-2">
            {fullName || "Resume Analysis"}
          </h1>
          <p className="body-text">{verdict}</p>
          <div className="flex items-center gap-3 mt-3 text-xs text-brand-muted">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <BriefcaseBusiness size={12} />
              {currentRole || "Not specified"}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="inline-flex items-center gap-1.5 bg-brand-bg rounded-full px-3 py-1">
            <Award size={12} className="text-brand-accent" />
            <span className="text-xs font-semibold text-brand-accent">
              {interviewReadiness}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
