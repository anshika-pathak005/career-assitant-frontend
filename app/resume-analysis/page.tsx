// app/resume-analysis/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { FileText, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import SkeletonCard from "@/components/ui/SkeletonCard";
import AnalyzeHeroCard from "@/components/resume/AnalyzeHeroCard";
import ResumeHistoryCard from "@/components/resume/ResumeHistoryCard";
import { useUserResumes } from "@/hooks/useResumeAnalysis";
import { useUserProfile } from "@/hooks/useUserProfile";

// Auth is handled by useRouteGuard in ClientLayoutWrapper - this page only
// renders once the guard has confirmed the user is logged in.
export default function ResumeAnalysisPage() {
  const router = useRouter();
  const { data: profile } = useUserProfile();
  const { data: resumes, isLoading } = useUserResumes();

  const limitReached = profile?.resumeUsage?.limitReached ?? false;
  const hasResumes = !isLoading && resumes && resumes.length > 0;

  return (
    <div className="min-h-screen bg-brand-bg py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {profile && (
          <div className="mb-8">
            <AnalyzeHeroCard
              userName={profile.name}
              resumeUsage={profile.resumeUsage}
            />
          </div>
        )}

        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-brand-primary text-2xl">
                My Resume Analyses
              </h1>
              <p className="text-sm text-brand-muted mt-0.5">
                Track your resume scores and improvement over time
              </p>
            </div>
            {!limitReached && (
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

          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {!isLoading && !hasResumes && (
            <EmptyState
              icon={FileText}
              title="No resumes analyzed yet"
              description="Upload your first resume to get an ATS score and personalized feedback."
              action={
                <Button
                  variant="primary"
                  onClick={() => router.push("/resume-analysis/analyze")}
                >
                  Analyze Your First Resume
                </Button>
              }
            />
          )}

          {hasResumes && (
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
