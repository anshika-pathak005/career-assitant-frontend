"use client";

import Link from "next/link";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import type { ResumeAnalysisResponse } from "@/services/resumeService";

/* ─── Score ring ─────────────────────────────────────────────────── */
function ScoreRing({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  const radius = 28;
  const stroke = 5;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - value) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 70 70">
          <circle
            cx="35"
            cy="35"
            r={radius}
            fill="none"
            stroke="#C2E8FF"
            strokeWidth={stroke}
          />
          <circle
            cx="35"
            cy="35"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            className="transition-all duration-1000"
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-sm font-bold"
          style={{ color }}
        >
          {value}
        </span>
      </div>
      <span className="text-[10px] font-semibold text-[#537FAF] text-center">
        {label}
      </span>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────── */
interface Props {
  data: ResumeAnalysisResponse;
}

export default function AnalysisOverviewCard({ data }: Props) {
  const { analysis, careerGuidance } = data;

  const scoreColor = (s: number) =>
    s >= 70 ? "#16A34A" : s >= 50 ? "#D97706" : "#DC2626";

  return (
    <div className="rounded-xl border border-[#7A9BC4]/20 bg-white shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#7A9BC4]/15">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#557EB2] mb-0.5">
            Latest Analysis
          </p>
          <p className="font-bold text-[#000F22] text-sm">
            {data.fileName || "Profile Analysis"}
          </p>
        </div>
        <Link
          href={`/analysis?resumeId=${data.resumeId}`}
          className="flex items-center gap-1.5 text-xs font-bold text-[#557EB2] hover:text-[#042558] transition-colors"
        >
          View Full Report <ArrowRight size={12} />
        </Link>
      </div>

      <div className="p-5">
        {/* Scores */}
        <div className="flex items-center justify-around mb-5 py-3 bg-[#C2E8FF]/30 rounded-lg">
          <ScoreRing
            value={analysis.overallScore}
            label="Overall"
            color={scoreColor(analysis.overallScore)}
          />
          <div className="w-px h-12 bg-[#7A9BC4]/20" />
          <ScoreRing
            value={analysis.atsScore}
            label="ATS Score"
            color={scoreColor(analysis.atsScore)}
          />
          <div className="w-px h-12 bg-[#7A9BC4]/20" />
          <div className="flex flex-col items-center gap-1">
            <div className="w-16 h-16 flex items-center justify-center">
              <span className="text-2xl font-bold text-[#000F22]">
                {analysis.experienceLevel}
              </span>
            </div>
            <span className="text-[10px] font-semibold text-[#537FAF]">
              Level
            </span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-xs text-[#537FAF] leading-relaxed mb-4 line-clamp-2">
          {analysis.summary}
        </p>

        {/* Quick stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-[#C2E8FF]/40">
            <Star size={14} className="text-[#557EB2]" />
            <span className="text-[10px] font-bold text-[#000F22] text-center">
              {analysis.strengths.length} Strengths
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-[#C2E8FF]/40">
            <AlertCircle size={14} className="text-[#D97706]" />
            <span className="text-[10px] font-bold text-[#000F22] text-center">
              {analysis.missingSkills.length} Gaps
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-[#C2E8FF]/40">
            <TrendingUp size={14} className="text-[#16A34A]" />
            <span className="text-[10px] font-bold text-[#000F22] text-center">
              {careerGuidance.recommendedRoles.length} Roles
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
