// app/resume-analysis/[id]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Target,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  BookOpen,
  BriefcaseBusiness,
  Star,
  Shield,
  Code2,
  Database,
  GraduationCap,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FullPageSpinner from "@/components/ui/FullPageSpinner";
import SectionHeader from "@/components/resume/SectionHeader";
import PillList from "@/components/resume/PillList";
import BulletList from "@/components/resume/BulletList";
import AnalysisHero from "@/components/resume/AnalysisHero";
import ScoresGrid from "@/components/resume/ScoresGrid";
import ProjectSuggestions from "@/components/resume/ProjectSuggestions";
import SectionAnalysis from "@/components/resume/SectionAnalysis";
import { useResumeAnalysis } from "@/hooks/useResumeAnalysis";

// Auth is handled by useRouteGuard in ClientLayoutWrapper - this page only
// renders once the guard has confirmed the user is logged in.
export default function ResumeAnalysisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = parseInt(params.id as string);
  const { data: analysis, isLoading } = useResumeAnalysis(resumeId);

  if (isLoading) return <FullPageSpinner />;

  if (!analysis) {
    return (
      <div className="min-h-screen bg-brand-bg py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card variant="default" padding="lg">
            <p className="text-brand-primary font-semibold mb-2">
              Analysis not found
            </p>
            <p className="text-sm text-brand-muted mb-4">
              The resume analysis you&apos;re looking for doesn&apos;t exist.
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

  const { scores, basicInfo, analysis: data } = analysis;
  const formattedDate = new Date(analysis.uploadedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div className="min-h-screen bg-brand-bg py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand-secondary transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <AnalysisHero
          fileName={analysis.fileName}
          fullName={basicInfo.fullName}
          verdict={data.resumeVerdict}
          currentRole={basicInfo.currentRole}
          interviewReadiness={basicInfo.interviewReadiness}
          formattedDate={formattedDate}
        />

        <ScoresGrid scores={scores} />

        {/* Summary */}
        <Card variant="default" padding="lg" className="mb-6">
          <SectionHeader icon={Lightbulb} title="Summary" />
          <p className="text-sm text-brand-muted leading-relaxed">
            {data.summary}
          </p>

          <div className="mt-4 p-3 bg-brand-bg/30 rounded-lg">
            <p className="text-xs font-semibold text-brand-secondary mb-1">
              Recruiter&apos;s Perspective
            </p>
            <p className="text-sm text-brand-muted leading-relaxed">
              {data.recruiterPerspective}
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
            <BulletList
              items={data.strengths}
              icon={CheckCircle2}
              tone="success"
            />
          </Card>

          <Card variant="default" padding="lg">
            <SectionHeader
              icon={AlertCircle}
              title="Weaknesses"
              description="Areas that need improvement"
            />
            <BulletList
              items={data.weaknesses}
              icon={AlertCircle}
              tone="warning"
            />
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
            <PillList items={data.missingSkills} tone="warning" />
          </Card>

          <Card variant="default" padding="lg">
            <SectionHeader
              icon={Target}
              title="Priority Skills"
              description="Focus on these first"
            />
            <PillList items={data.prioritySkills} tone="success" />
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
            <BulletList items={data.atsSuggestions} />
          </Card>

          <Card variant="default" padding="lg">
            <SectionHeader
              icon={Database}
              title="Missing Keywords"
              description="Keywords recruiters look for"
            />
            <PillList items={data.missingKeywords} tone="muted" />
          </Card>
        </div>

        {/* Improvement Suggestions */}
        <Card variant="default" padding="lg" className="mb-6">
          <SectionHeader
            icon={TrendingUp}
            title="Improvement Suggestions"
            description="Actionable steps to improve your resume"
          />
          <BulletList items={data.improvementSuggestions} />
        </Card>

        <ProjectSuggestions projects={data.projectSuggestions} />

        {/* Recommended Learning & Roles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card variant="default" padding="lg">
            <SectionHeader icon={BookOpen} title="Recommended Learning" />
            <PillList items={data.recommendedLearning} tone="accent" />
          </Card>

          <Card variant="default" padding="lg">
            <SectionHeader icon={BriefcaseBusiness} title="Recommended Roles" />
            <PillList items={data.recommendedRoles} tone="secondary" />
          </Card>
        </div>

        {/* Recommended Certifications */}
        <Card variant="default" padding="lg" className="mb-6">
          <SectionHeader
            icon={GraduationCap}
            title="Recommended Certifications"
          />
          <PillList items={data.recommendedCertifications} tone="warning" />
        </Card>

        <SectionAnalysis sections={data.sectionAnalysis} />

        {/* Footer Actions */}
        <div className="mt-8 flex gap-3 justify-center">
          <Button
            variant="ghost"
            size="md"
            onClick={() => router.push("/resume-analysis")}
          >
            Back to Analyses
          </Button>
        </div>
      </div>
    </div>
  );
}
