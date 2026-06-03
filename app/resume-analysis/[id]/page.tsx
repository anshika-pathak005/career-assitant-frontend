// app/resume-analysis/[id]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Award,
  Target,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  BookOpen,
  BriefcaseBusiness,
  Star,
  Sparkles,
  Shield,
  Code2,
  Database,
  Cloud,
  Rocket,
  GraduationCap,
  Users,
  Trophy,
  Clock,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { useResumeAnalysis } from "@/hooks/useResumeAnalysis";
import { useEffect } from "react";

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
  const radius = 35;
  const stroke = 6;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - value) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 85 85">
          <circle
            cx="42.5"
            cy="42.5"
            r={radius}
            fill="none"
            stroke="#C2E8FF"
            strokeWidth={stroke}
          />
          <circle
            cx="42.5"
            cy="42.5"
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
          className="absolute inset-0 flex items-center justify-center text-xl font-bold"
          style={{ color }}
        >
          {value}
        </span>
      </div>
      <span className="text-xs font-medium text-[#537FAF]">{label}</span>
    </div>
  );
}

/* ─── Section Header ────────────────────────────────────────────── */
function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-[#C2E8FF] flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-[#557EB2]" />
      </div>
      <div>
        <h2 className="font-semibold text-[#000F22] text-lg">{title}</h2>
        {description && (
          <p className="text-xs text-[#537FAF] mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function ResumeAnalysisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = parseInt(params.id as string);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: analysis, isLoading } = useResumeAnalysis(resumeId);

  /* Auth guard */
  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.replace("/login");
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-[#C2E8FF] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#557EB2] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (!analysis) {
    return (
      <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card variant="default" padding="lg">
            <p className="text-[#000F22] font-semibold mb-2">
              Analysis not found
            </p>
            <p className="text-sm text-[#537FAF] mb-4">
              The resume analysis you're looking for doesn't exist.
            </p>
            <Button
              variant="primary"
              onClick={() => router.push("/resume-analysis")}
            >
              Back to Analyses
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const { scores, basicInfo, analysis: analysisData } = analysis;
  const formattedDate = new Date(analysis.uploadedAt).toLocaleDateString(
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

  return (
    <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-[#537FAF] hover:text-[#042558] transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* Hero Section */}
        <Card variant="default" padding="lg" className="mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={16} className="text-[#557EB2]" />
                <span className="text-xs font-medium text-[#557EB2]">
                  {analysis.fileName}
                </span>
              </div>
              <h1 className="font-display text-[#000F22] text-2xl sm:text-3xl mb-2">
                {basicInfo.fullName || "Resume Analysis"}
              </h1>
              <p className="text-sm text-[#537FAF] leading-relaxed">
                {analysisData.resumeVerdict}
              </p>
              <div className="flex items-center gap-3 mt-3 text-xs text-[#537FAF]">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <BriefcaseBusiness size={12} />
                  {basicInfo.currentRole || "Not specified"}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="inline-flex items-center gap-1.5 bg-[#C2E8FF] rounded-full px-3 py-1">
                <Award size={12} className="text-[#557EB2]" />
                <span className="text-xs font-semibold text-[#557EB2]">
                  {basicInfo.interviewReadiness}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Scores Grid */}
        <Card variant="default" padding="md" className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
            <ScoreRing
              value={scores.overallScore}
              label="Overall"
              color={getScoreColor(scores.overallScore)}
            />
            <ScoreRing
              value={scores.atsScore}
              label="ATS Score"
              color={getScoreColor(scores.atsScore)}
            />
            <ScoreRing
              value={scores.technicalSkillsScore}
              label="Technical"
              color={getScoreColor(scores.technicalSkillsScore)}
            />
            <ScoreRing
              value={scores.projectQualityScore}
              label="Projects"
              color={getScoreColor(scores.projectQualityScore)}
            />
            <ScoreRing
              value={scores.formattingScore}
              label="Formatting"
              color={getScoreColor(scores.formattingScore)}
            />
          </div>
        </Card>

        {/* Summary */}
        <Card variant="default" padding="lg" className="mb-6">
          <SectionHeader icon={Lightbulb} title="Summary" />
          <p className="text-sm text-[#537FAF] leading-relaxed">
            {analysisData.summary}
          </p>

          <div className="mt-4 p-3 bg-[#C2E8FF]/30 rounded-lg">
            <p className="text-xs font-semibold text-[#042558] mb-1">
              Recruiter's Perspective
            </p>
            <p className="text-sm text-[#537FAF] leading-relaxed">
              {analysisData.recruiterPerspective}
            </p>
          </div>
        </Card>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card variant="default" padding="lg">
            <SectionHeader
              icon={Star}
              title="Strengths"
              description="What stands out in your resume"
            />
            <ul className="space-y-2">
              {analysisData.strengths.map((strength: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-[#537FAF]"
                >
                  <CheckCircle2
                    size={14}
                    className="text-[#16A34A] flex-shrink-0 mt-0.5"
                  />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="default" padding="lg">
            <SectionHeader
              icon={AlertCircle}
              title="Weaknesses"
              description="Areas that need improvement"
            />
            <ul className="space-y-2">
              {analysisData.weaknesses.map((weakness: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-[#537FAF]"
                >
                  <AlertCircle
                    size={14}
                    className="text-[#D97706] flex-shrink-0 mt-0.5"
                  />
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Missing Skills & Priority Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card variant="default" padding="lg">
            <SectionHeader
              icon={Code2}
              title="Missing Skills"
              description="Skills you need to acquire"
            />
            <div className="flex flex-wrap gap-2">
              {analysisData.missingSkills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="text-xs font-medium text-[#D97706] bg-[#D97706]/10 px-2.5 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          <Card variant="default" padding="lg">
            <SectionHeader
              icon={Target}
              title="Priority Skills"
              description="Focus on these first"
            />
            <div className="flex flex-wrap gap-2">
              {analysisData.prioritySkills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="text-xs font-medium text-[#16A34A] bg-[#16A34A]/10 px-2.5 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* ATS Suggestions & Missing Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card variant="default" padding="lg">
            <SectionHeader
              icon={Shield}
              title="ATS Suggestions"
              description="Improve your ATS score"
            />
            <ul className="space-y-2">
              {analysisData.atsSuggestions.map(
                (suggestion: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-[#537FAF]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#557EB2] mt-2 flex-shrink-0" />
                    <span>{suggestion}</span>
                  </li>
                ),
              )}
            </ul>
          </Card>

          <Card variant="default" padding="lg">
            <SectionHeader
              icon={Database}
              title="Missing Keywords"
              description="Keywords recruiters look for"
            />
            <div className="flex flex-wrap gap-2">
              {analysisData.missingKeywords.map(
                (keyword: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-[#7A9BC4] bg-[#C2E8FF] px-2.5 py-1 rounded-full"
                  >
                    {keyword}
                  </span>
                ),
              )}
            </div>
          </Card>
        </div>

        {/* Improvement Suggestions */}
        <Card variant="default" padding="lg" className="mb-6">
          <SectionHeader
            icon={TrendingUp}
            title="Improvement Suggestions"
            description="Actionable steps to improve your resume"
          />
          <ul className="space-y-2">
            {analysisData.improvementSuggestions.map(
              (suggestion: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-[#537FAF]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#557EB2] mt-2 flex-shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ),
            )}
          </ul>
        </Card>

        {/* Project Suggestions */}
        <Card variant="default" padding="lg" className="mb-6">
          <SectionHeader
            icon={Rocket}
            title="Project Suggestions"
            description="Build these to strengthen your portfolio"
          />
          <div className="space-y-3">
            {analysisData.projectSuggestions.map(
              (project: string, idx: number) => {
                const [title, description] = project.split(" — ");
                return (
                  <div key={idx} className="p-3 bg-[#C2E8FF]/30 rounded-lg">
                    <p className="text-sm font-semibold text-[#000F22]">
                      {title}
                    </p>
                    <p className="text-xs text-[#537FAF] mt-0.5">
                      {description}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        </Card>

        {/* Recommended Learning & Roles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card variant="default" padding="lg">
            <SectionHeader icon={BookOpen} title="Recommended Learning" />
            <div className="flex flex-wrap gap-2">
              {analysisData.recommendedLearning.map(
                (item: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-[#557EB2] bg-[#C2E8FF] px-2.5 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </Card>

          <Card variant="default" padding="lg">
            <SectionHeader icon={BriefcaseBusiness} title="Recommended Roles" />
            <div className="flex flex-wrap gap-2">
              {analysisData.recommendedRoles.map(
                (role: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-[#042558] bg-[#C2E8FF] px-2.5 py-1 rounded-full"
                  >
                    {role}
                  </span>
                ),
              )}
            </div>
          </Card>
        </div>

        {/* Recommended Certifications */}
        <Card variant="default" padding="lg" className="mb-6">
          <SectionHeader
            icon={GraduationCap}
            title="Recommended Certifications"
          />
          <div className="flex flex-wrap gap-2">
            {analysisData.recommendedCertifications.map(
              (cert: string, idx: number) => (
                <span
                  key={idx}
                  className="text-xs font-medium text-[#D97706] bg-[#D97706]/10 px-2.5 py-1 rounded-full"
                >
                  {cert}
                </span>
              ),
            )}
          </div>
        </Card>

        {/* Section Analysis */}
        <Card variant="default" padding="lg">
          <SectionHeader
            icon={Users}
            title="Section-wise Analysis"
            description="Detailed breakdown of each resume section"
          />
          <div className="space-y-3">
            {Object.entries(analysisData.sectionAnalysis).map(
              ([section, feedback]) => (
                <div
                  key={section}
                  className="border-b border-[#7A9BC4]/15 pb-3 last:border-0"
                >
                  <p className="text-sm font-semibold text-[#000F22] capitalize">
                    {section}
                  </p>
                  <p className="text-xs text-[#537FAF] mt-0.5">
                    {feedback as string}
                  </p>
                </div>
              ),
            )}
          </div>
        </Card>

        {/* Footer Actions */}
        <div className="mt-8 flex gap-3 justify-center">
          <Button
            variant="ghost"
            size="md"
            onClick={() => router.push("/resume-analysis")}
          >
            Back to Analyses
          </Button>
          {/* <Button
            variant="primary"
            size="md"
            onClick={() => router.push("/resume-analysis/analyze")}
          >
            Analyze Another Resume
          </Button> */}
        </div>
      </div>
    </div>
  );
}
