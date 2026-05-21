// app/resume-analysis/page.tsx

"use client";

import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  FileText,
  Calendar,
  TrendingUp,
  Plus,
  Target,
  Award,
  BarChart3,
  Upload,
  AlertCircle,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { useUserResumes } from "@/hooks/useResumeAnalysis";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useEffect } from "react";

/* ─── Skeleton Loader ───────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-[#7A9BC4]/20 p-5 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="h-5 bg-[#C2E8FF] rounded w-40" />
        <div className="h-5 bg-[#C2E8FF] rounded w-16" />
      </div>
      <div className="h-3 bg-[#C2E8FF] rounded w-32 mb-4" />
      <div className="h-2 bg-[#C2E8FF] rounded-full mb-3 w-32" />
      <div className="h-8 bg-[#C2E8FF] rounded w-32" />
    </div>
  );
}

/* ─── Hero CTA Card with Usage Card Below ───────────────────────── */
function HeroCTA({
  userName,
  resumeUsage,
}: {
  userName: string;
  resumeUsage: any;
}) {
  const router = useRouter();
  const { data: profile } = useUserProfile();
  const limitReached = profile?.resumeUsage?.limitReached || false;
  const used = profile?.resumeUsage?.used || 0;
  const total = profile?.resumeUsage?.total || 3;
  const remaining = profile?.resumeUsage?.remaining || 0;
  const percentage = (used / total) * 100;

  return (
    <div className="space-y-4">
      {/* Main CTA Card */}
      <Card
        variant="flat"
        padding="lg"
        className="relative overflow-hidden bg-gradient-to-br from-[#000F22] to-[#042558] border-none"
      >
        <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#557EB2]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#7A9BC4]/10 blur-2xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-5">
            <Sparkles size={14} className="text-[#7A9BC4]" />
            <span className="text-[11px] font-medium text-[#7A9BC4] uppercase tracking-wider">
              Ai Powered Resume Analysis
            </span>
          </div>

          <h2 className="font-display text-white text-2xl sm:text-3xl lg:text-4xl mb-3">
            Get your resume analyzed, {userName?.split(" ")[0]}
          </h2>

          <p className="text-[#7A9BC4] text-sm sm:text-base max-w-md mb-6 leading-relaxed">
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

      {/* Usage Card - Separate Card Below */}
      <Card
        variant="flat"
        padding="sm"
        className="border border-[#7A9BC4]/20 bg-white/50"
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C2E8FF] flex items-center justify-center">
              <FileText size={14} className="text-[#557EB2]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#042558]">
                Monthly Analysis Limit
              </p>
              <p className="text-xs text-[#537FAF]">
                {used} / {total} analyses used this month
              </p>
            </div>
          </div>

          {limitReached && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/pricing")}
              className="bg-[#000F22] text-white hover:bg-[#042558]"
            >
              Upgrade to Get More
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-2 h-1.5 bg-[#C2E8FF] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#557EB2] rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Reset Info */}
        <p className="text-[10px] text-[#7A9BC4] mt-1.5">
          {limitReached
            ? `Resets on ${new Date(resumeUsage.resetsOn).toLocaleDateString()}`
            : `${remaining} analysis${remaining !== 1 ? "es" : ""} remaining this month`}
        </p>
      </Card>
    </div>
  );
}

/* ─── Empty State ───────────────────────────────────────────────── */
function EmptyState() {
  const router = useRouter();

  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-full bg-[#C2E8FF] flex items-center justify-center mx-auto mb-4">
        <FileText size={24} className="text-[#557EB2]" />
      </div>
      <h3 className="font-display text-[#000F22] text-xl mb-2">
        No resumes analyzed yet
      </h3>
      <p className="text-sm text-[#537FAF] max-w-md mx-auto mb-6">
        Upload your first resume to get AI-powered insights and improve your job
        prospects.
      </p>
      <Button variant="primary" onClick={() => router.push("/analysis")}>
        Analyze Your First Resume
      </Button>
    </div>
  );
}

/* ─── Score Ring Component ──────────────────────────────────────── */
function ScoreRing({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-12 h-12">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#C2E8FF"
            strokeWidth="4"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 20}
            strokeDashoffset={2 * Math.PI * 20 * (1 - value / 100)}
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
      <span className="text-[10px] font-medium text-[#537FAF]">{label}</span>
    </div>
  );
}

/* ─── Resume History Card ───────────────────────────────────────── */
function ResumeHistoryCard({ resume }: { resume: any }) {
  const router = useRouter();

  const formattedDate = new Date(resume.uploadedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const getScoreColor = (score: number) => {
    if (score >= 70) return "#16A34A";
    if (score >= 50) return "#D97706";
    return "#DC2626";
  };

  const getReadinessBadge = (level: string) => {
    switch (level?.toLowerCase()) {
      case "advanced":
        return (
          <span className="text-[10px] font-semibold text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded-full">
            Advanced
          </span>
        );
      case "intermediate":
        return (
          <span className="text-[10px] font-semibold text-[#557EB2] bg-[#C2E8FF] px-2 py-0.5 rounded-full">
            Intermediate
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-semibold text-[#7A9BC4] bg-[#C2E8FF] px-2 py-0.5 rounded-full">
            {level || "Beginner"}
          </span>
        );
    }
  };

  const overallScore = resume.overallScore || 0;
  const atsScore = resume.atsScore || 0;

  return (
    <Card
      variant="default"
      padding="md"
      className="hover:shadow-lg transition-all duration-200"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-[#000F22] text-lg">
              {resume.fileName}
            </h3>
            {getReadinessBadge(resume.interviewReadiness)}
          </div>

          <div className="flex items-center gap-3 text-xs text-[#537FAF] mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Award size={12} />
              {resume.experienceLevel || "Entry"} Level
            </span>
          </div>

          {/* Score Indicators */}
          <div className="flex items-center gap-4">
            <ScoreRing
              value={overallScore}
              label="Overall"
              color={getScoreColor(overallScore)}
            />
            <ScoreRing
              value={atsScore}
              label="ATS Score"
              color={getScoreColor(atsScore)}
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#000F22]">
                {resume.missingSkills?.length || 0} gaps
              </span>
              <span className="text-[10px] text-[#537FAF]">
                Skills to improve
              </span>
            </div>
          </div>
        </div>

        {/* Right Button */}
        <Button
          variant="primary"
          size="md"
          rightIcon={<ArrowRight size={14} />}
          onClick={() => router.push(`/resume-analysis/${resume.resumeId}`)}
          className="flex-shrink-0 bg-[#000F22] text-white hover:bg-[#042558]"
        >
          View Analysis
        </Button>
      </div>
    </Card>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function ResumeAnalysisPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: profile } = useUserProfile();
  const { data: resumes, isLoading: resumesLoading } = useUserResumes();
  const router = useRouter();

   /* Auth guard */
    useEffect(() => {
      if (!authLoading && !isAuthenticated) router.replace("/login");
    }, [authLoading, isAuthenticated, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#C2E8FF] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#557EB2] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const isLoading = resumesLoading;

  return (
    <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero CTA Card */}
        {profile && (
          <div className="mb-8">
            <HeroCTA
              userName={profile.name}
              resumeUsage={profile.resumeUsage}
            />
          </div>
        )}

        {/* Resumes Section */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-[#000F22] text-2xl">
                My Resume Analyses
              </h1>
              <p className="text-sm text-[#537FAF] mt-0.5">
                Track your resume scores and improvement over time
              </p>
            </div>
            {!profile?.resumeUsage?.limitReached && (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Plus size={14} />}
                onClick={() => router.push("/resume-analysis/analyze")}
              >
                New Analysis
              </Button>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && (!resumes || resumes.length === 0) && <EmptyState />}

          {/* Resumes List */}
          {!isLoading && resumes && resumes.length > 0 && (
            <div className="space-y-3">
              {resumes.map((resume) => (
                <ResumeHistoryCard key={resume.resumeId} resume={resume} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
