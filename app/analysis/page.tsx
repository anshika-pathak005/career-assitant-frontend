"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  BarChart3,
  ShieldCheck,
  Star,
  AlertCircle,
  TrendingUp,
  Lightbulb,
  Briefcase,
  BookOpen,
  FolderGit2,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useLatestAnalysis } from "@/hooks/useResumeAnalysis";
import type { ResumeAnalysisResponse } from "@/services/resumeService";

/* ─── Score ring component ───────────────────────────────────────── */
function ScoreRing({
  value,
  label,
  color,
  size = 96,
}: {
  value: number;
  label: string;
  color: string;
  size?: number;
}) {
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const off = ((100 - value) / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#C2E8FF"
            strokeWidth="7"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={off}
            className="transition-all duration-1000"
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-2xl font-bold"
          style={{ color }}
        >
          {value}
        </span>
      </div>
      <span className="text-xs font-semibold text-[#537FAF]">{label}</span>
    </div>
  );
}

/* ─── Section wrapper ────────────────────────────────────────────── */
function Section({
  title,
  icon: Icon,
  children,
  accent = "#557EB2",
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#7A9BC4]/20 shadow-card overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#7A9BC4]/12">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${accent}18` }}
        >
          <Icon size={16} style={{ color: accent }} />
        </div>
        <h2 className="font-bold text-[#000F22] text-sm">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ─── Skill chip ─────────────────────────────────────────────────── */
function Chip({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "missing" | "soft";
}) {
  const styles = {
    default: "bg-[#C2E8FF] text-[#042558] border-[#7A9BC4]/30",
    missing: "bg-red-50 text-red-600 border-red-200",
    soft: "bg-green-50 text-green-700 border-green-200",
  };
  return (
    <span
      className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full border ${styles[variant]}`}
    >
      {label}
    </span>
  );
}

/* ─── Main analysis view ─────────────────────────────────────────── */
function AnalysisContent({ data }: { data: ResumeAnalysisResponse }) {
  const { analysis, careerGuidance } = data;
  const scoreColor = (s: number) =>
    s >= 70 ? "#16A34A" : s >= 50 ? "#D97706" : "#DC2626";

  return (
    <div className="flex flex-col gap-5">
      {/* ── Hero scores ──────────────────────────────────────── */}
      <div className="bg-[#000F22] rounded-2xl px-6 py-8 animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-1">
            <p className="text-[#537FAF] text-xs font-bold uppercase tracking-wider mb-1">
              {data.fileName || "Profile Analysis"}
            </p>
            <h1 className="font-display italic text-white text-2xl sm:text-3xl mb-1">
              {analysis.fullName}
            </h1>
            <p className="text-[#537FAF] text-sm mb-3">
              {analysis.currentRole}
            </p>
            <p className="text-xs text-[#537FAF] leading-relaxed max-w-xl line-clamp-3">
              {analysis.summary}
            </p>
          </div>
          <div className="flex items-center gap-8 flex-shrink-0">
            <ScoreRing
              value={analysis.overallScore}
              label="Overall Score"
              color={scoreColor(analysis.overallScore)}
            />
            <ScoreRing
              value={analysis.atsScore}
              label="ATS Score"
              color={scoreColor(analysis.atsScore)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fade-up delay-1">
        {/* ── Technical skills ─────────────────────────────── */}
        <Section title="Technical Skills" icon={BarChart3}>
          <div className="flex flex-wrap gap-2">
            {analysis.technicalSkills.map((s) => (
              <Chip key={s} label={s} />
            ))}
          </div>
        </Section>

        {/* ── Soft skills ──────────────────────────────────── */}
        <Section title="Soft Skills" icon={Star} accent="#16A34A">
          <div className="flex flex-wrap gap-2">
            {analysis.softSkills.map((s) => (
              <Chip key={s} label={s} variant="soft" />
            ))}
          </div>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fade-up delay-2">
        {/* ── Strengths ─────────────────────────────────────── */}
        <Section title="Key Strengths" icon={CheckCircle2} accent="#16A34A">
          <ul className="flex flex-col gap-2.5">
            {analysis.strengths.map((s) => (
              <li
                key={s}
                className="flex items-start gap-2.5 text-sm text-[#042558]"
              >
                <CheckCircle2
                  size={15}
                  className="text-[#16A34A] mt-0.5 flex-shrink-0"
                />
                {s}
              </li>
            ))}
          </ul>
        </Section>

        {/* ── Areas for improvement ─────────────────────────── */}
        <Section title="Areas to Improve" icon={AlertCircle} accent="#D97706">
          <ul className="flex flex-col gap-2.5">
            {analysis.improvements.map((s) => (
              <li
                key={s}
                className="flex items-start gap-2.5 text-sm text-[#042558]"
              >
                <AlertCircle
                  size={15}
                  className="text-[#D97706] mt-0.5 flex-shrink-0"
                />
                {s}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fade-up delay-2">
        {/* ── Missing skills ────────────────────────────────── */}
        <Section title="Missing Skills" icon={XCircle} accent="#DC2626">
          <div className="flex flex-wrap gap-2">
            {analysis.missingSkills.map((s) => (
              <Chip key={s} label={s} variant="missing" />
            ))}
          </div>
          {analysis.missingKeywords.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#7A9BC4]/15">
              <p className="text-xs font-bold text-[#537FAF] uppercase tracking-wider mb-2">
                Missing Keywords
              </p>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.map((k) => (
                  <span
                    key={k}
                    className="text-xs font-medium text-[#537FAF] bg-[#C2E8FF]/60 px-2.5 py-1 rounded-full border border-[#7A9BC4]/20"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* ── Recommended roles ─────────────────────────────── */}
        <Section title="Recommended Roles" icon={Briefcase} accent="#042558">
          <div className="flex flex-col gap-2">
            {careerGuidance.recommendedRoles.map((role, i) => (
              <div
                key={role}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#C2E8FF]/40 border border-[#7A9BC4]/20 hover:bg-[#C2E8FF]/70 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#000F22] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm font-semibold text-[#000F22]">
                    {role}
                  </span>
                </div>
                <ChevronRight size={14} className="text-[#537FAF]" />
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ── Learning Roadmap ───────────────────────────────── */}
      <Section title="Learning Roadmap" icon={BookOpen} accent="#557EB2">
        <div className="relative pl-4">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-[#C2E8FF]" />
          <div className="flex flex-col gap-5">
            {careerGuidance.learningRoadmap.map((step, i) => (
              <div
                key={i}
                className="relative flex items-start gap-4 animate-fade-up"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                {/* Node */}
                <div className="absolute -left-[18px] w-5 h-5 rounded-full border-2 border-[#557EB2] bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-bold text-[#557EB2]">
                    {i + 1}
                  </span>
                </div>
                <p className="text-sm text-[#042558] leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Project suggestions ─────────────────────────────── */}
      <Section title="Project Ideas" icon={FolderGit2} accent="#7A9BC4">
        <div className="flex flex-col gap-3">
          {careerGuidance.projectSuggestions.map((proj, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3.5 rounded-lg bg-[#C2E8FF]/30 border border-[#7A9BC4]/20 hover:bg-[#C2E8FF]/60 transition-colors"
            >
              <div className="w-7 h-7 rounded-md bg-[#000F22] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm text-[#042558] leading-relaxed">{proj}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Career advice ──────────────────────────────────── */}
      <Section title="Career Advice" icon={Lightbulb} accent="#D97706">
        <div className="relative pl-4 border-l-2 border-[#D97706]/30">
          <p className="text-sm text-[#042558] leading-relaxed italic">
            "{careerGuidance.careerAdvice}"
          </p>
        </div>
      </Section>
    </div>
  );
}

/* ─── Loading skeleton ───────────────────────────────────────────── */
function AnalysisSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-40 rounded-xl bg-[#C2E8FF]/60 animate-pulse"
        />
      ))}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
function AnalysisPageInner() {
  const { data, isLoading } = useLatestAnalysis();

  return (
    <div className="min-h-screen bg-[#C2E8FF] flex flex-col">
      {/* <Navbar /> */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 gap-6 py-6">
        <Sidebar />
        <main className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Back link */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#537FAF] hover:text-[#000F22] transition-colors self-start"
          >
            <ArrowLeft size={15} /> Back to Dashboard
          </Link>

          {isLoading ? (
            <AnalysisSkeleton />
          ) : data ? (
            <AnalysisContent data={data} />
          ) : (
            <div className="bg-white rounded-xl border border-[#7A9BC4]/20 shadow-card flex flex-col items-center justify-center py-20 gap-4">
              <BarChart3 size={40} className="text-[#7A9BC4]" />
              <p className="font-bold text-[#000F22]">No analysis found</p>
              <p className="text-sm text-[#537FAF]">
                Complete a career analysis from the dashboard to see your
                results here.
              </p>
              <Link
                href="/dashboard"
                className="mt-2 inline-flex items-center gap-2 bg-[#000F22] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#042558] transition-colors"
              >
                Go to Dashboard <ChevronRight size={14} />
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <Suspense>
      <AnalysisPageInner />
    </Suspense>
  );
}
