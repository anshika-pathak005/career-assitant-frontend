// app/resume-analysis/analyze/page.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Shield,
  Clock,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUploadResume } from "@/hooks/useResumeAnalysis";
import FullPageSpinner from "@/components/ui/FullPageSpinner";
import ProfileIncompleteScreen from "@/components/roadmap/ProfileIncompleteScreen";
import LimitReachedScreen from "@/components/roadmap/LimitReachedScreen";

/* ─── File size limit (5MB) ─────────────────────────────────────── */
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["application/pdf"];

export default function ResumeUploadPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const uploadMutation = useUploadResume();

  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Auth guard */
  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.replace("/login");
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || profileLoading) {
    return <FullPageSpinner />;
  }

  if (!isAuthenticated) return null;

  /* Quota limit guard */
  if (profile?.resumeUsage?.limitReached) {
    return (
      <LimitReachedScreen
        limit={profile.resumeUsage}
        title="Monthly resume limit reached"
        description={
          <p>
            You&apos;ve used all{" "}
            <span className="font-bold text-brand-primary">
              {profile.resumeUsage.total}
            </span>{" "}
            free resume analyses this month. Upgrade to unlock unlimited
            analyses and accelerate your career journey.
          </p>
        }
        upgradeText="Upgrade to Pro – Unlimited Analyses"
        backHref="/resume-analysis"
        backLabel="Back to Analyses"
      />
    );
  }

  /* Profile incomplete guard */
  if (profile && (!profile.isProfileComplete || !profile.dreamJob?.trim())) {
    return (
      <ProfileIncompleteScreen
        title="Complete Your Profile First"
        description="To analyze your resume against your target career goals, please complete your profile setup (including your dream job) first."
        backHref="/resume-analysis"
        backLabel="Back to Analyses"
      />
    );
  }

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only PDF files are supported");
      return false;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      // Auto-upload after selection, and redirect on success, but lets not refirect here beacuse it is overriding hook ka redirection so, let hook handle that
      // uploadMutation.mutate(file, {
      //   onSuccess: () => {
      //     router.push("/resume-analysis");
      //   },
      // });
      uploadMutation.mutate(file);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => {
    setDragOver(false);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="page-shell">
      <div className="page-container-narrow">
        {/* Header */}
        <div className="page-header">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand-secondary transition-colors mb-4"
          >
            ← Back
          </button>
        </div>

        {/* Main Card */}
        <Card variant="default" padding="lg" className="text-center">
          <Card
            variant="flat"
            padding="lg"
            className="relative overflow-hidden bg-gradient-to-br from-brand-primary to-brand-secondary border-none text-center mb-6"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-accent-lt/10 blur-2xl" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <FileText size={28} className="text-white" />
              </div>

              <h1 className="hero-title mb-2">
                Upload Your Resume
              </h1>

              <p className="text-brand-accent-lt text-base max-w-md mx-auto mb-6 leading-relaxed">
                Get AI-powered analysis, ATS score, and personalized
                recommendations to improve your resume.
              </p>
            </div>
          </Card>

          {/* File Upload Area */}
          {!uploadMutation.isPending && !selectedFile ? (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all duration-200
                ${
                  dragOver
                    ? "border-brand-accent bg-brand-bg/50"
                    : "border-brand-accent-lt/40 hover:border-brand-accent hover:bg-brand-bg/20"
                }
              `}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-brand-bg flex items-center justify-center">
                  <Upload size={22} className="text-brand-accent" />
                </div>
                <div>
                  <p className="font-semibold text-brand-primary text-sm mb-1">
                    Drag & drop your resume here
                  </p>
                  <p className="meta-text">or click to browse</p>
                </div>
                <div className="flex items-center gap-3 text-2xs text-brand-accent-lt mt-2">
                  <span className="flex items-center gap-1">
                    <FileText size={10} />
                    PDF only
                  </span>
                  <span className="flex items-center gap-1">
                    <AlertCircle size={10} />
                    Max 5MB
                  </span>
                </div>
              </div>
            </div>
          ) : uploadMutation.isPending ? (
            /* Uploading State */
            <div className="border-2 border-brand-accent rounded-xl p-10 bg-brand-bg/30">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-brand-accent/20 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                </div>
                <div>
                  <p className="font-semibold text-brand-primary text-sm mb-1">
                    Analyzing your resume...
                  </p>
                  <p className="meta-text">
                    This usually takes 10-20 seconds
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* File Selected State */
            <div className="border-2 border-brand-success rounded-xl p-6 bg-brand-success/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-success/20 flex items-center justify-center">
                    <CheckCircle2 size={18} className="text-brand-success" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-brand-primary text-sm">
                      {selectedFile?.name}
                    </p>
                    <p className="meta-text">
                      {selectedFile &&
                        (selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                      MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearFile}
                  className="text-brand-muted hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-xs text-brand-success mt-3 flex items-center gap-1">
                <CheckCircle2 size={12} />
                File validated. Uploading...
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={onFileChange}
          />

          {/* Features List */}
          <div className="mt-8 pt-6 border-t border-brand-accent-lt/15">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield size={12} className="text-brand-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-primary">
                    ATS Score
                  </p>
                  <p className="text-2xs text-brand-muted">
                    Check recruiter compatibility
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={12} className="text-brand-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-primary">
                    Skill Gap Analysis
                  </p>
                  <p className="text-2xs text-brand-muted">
                    Identify missing keywords
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={12} className="text-brand-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-primary">
                    Quick Analysis
                  </p>
                  <p className="text-2xs text-brand-muted">
                    Results in seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Note */}
        <p className="text-center text-2xs text-brand-accent-lt mt-6">
          Your resume is secure and encrypted. We never share your data with
          third parties.
        </p>
      </div>
    </div>
  );
}
