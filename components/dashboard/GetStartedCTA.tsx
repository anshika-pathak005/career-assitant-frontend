"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  FileText,
  User,
  ArrowRight,
  X,
  Upload,
  ChevronRight,
} from "lucide-react";
import { useUploadResume } from "@/hooks/useResumeAnalysis";
import { toast } from "sonner";

interface Props {
  userName: string;
}

type Step = "idle" | "choosing" | "uploading";

export default function GetStartedCTA({ userName }: Props) {
  const [step, setStep] = useState<Step>("idle");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const uploadMutation = useUploadResume();

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }
    uploadMutation.mutate(file);
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

  return (
    <>
      {/* ── Hero CTA card ──────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-brand-primary px-6 py-8 sm:px-10 sm:py-10">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-brand-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-brand-accent-lt/10 blur-2xl" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-full px-3 py-1 mb-4">
              <Sparkles size={11} className="text-brand-accent-lt" />
              <span className="text-2xs font-semibold text-brand-accent-lt uppercase tracking-wider">
                AI-Powered
              </span>
            </div>
            <h2 className="hero-title mb-2">
              Ready to accelerate
              <br className="hidden sm:block" /> your career,{" "}
              {userName.split(" ")[0]}?
            </h2>
            <p className="text-brand-muted text-sm leading-relaxed max-w-md">
              Get a personalized career roadmap, skill gap analysis, and job
              recommendations -powered by AI in seconds.
            </p>
          </div>

          <button
            onClick={() => setStep("choosing")}
            className="flex-shrink-0 group flex items-center gap-2.5 bg-white text-brand-primary font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-brand-bg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Sparkles size={16} className="text-brand-accent" />
            Get Your Career Roadmap
            <ArrowRight
              size={15}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* ── Path chooser modal ─────────────────────────────────── */}
      {(step === "choosing" || step === "uploading") && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-primary/60 backdrop-blur-sm"
          onClick={() => {
            if (!uploadMutation.isPending) setStep("idle");
          }}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            {!uploadMutation.isPending && (
              <button
                onClick={() => setStep("idle")}
                className="absolute top-4 right-4 text-brand-muted hover:text-brand-primary transition-colors"
              >
                <X size={18} />
              </button>
            )}

            <div className="mb-6">
              <h3 className="section-title mb-1">
                How would you like to start?
              </h3>
              <p className="text-sm text-brand-muted">
                Choose an option -you can always do the other one later.
              </p>
            </div>

            {step === "choosing" && (
              <div className="flex flex-col gap-3">
                {/* Option A -with resume */}
                <button
                  onClick={() => setStep("uploading")}
                  className="group flex items-start gap-4 p-4 rounded-xl border-2 border-brand-accent-lt/25 hover:border-brand-accent hover:bg-brand-bg/30 text-left transition-all duration-150"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-bg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-accent/20 transition-colors">
                    <FileText size={18} className="text-brand-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="font-bold text-brand-primary text-sm">
                        Start with Resume
                      </p>
                      <ChevronRight
                        size={15}
                        className="text-brand-muted group-hover:translate-x-0.5 transition-transform"
                      />
                    </div>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      Upload your PDF resume for the most accurate analysis, ATS
                      score, and tailored roadmap.
                    </p>
                    <span className="mt-1.5 inline-block text-2xs font-bold text-brand-accent bg-brand-bg px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                </button>

                {/* Option B -without resume */}
                <button
                  onClick={() => router.push("/profile-setup")}
                  className="group flex items-start gap-4 p-4 rounded-xl border-2 border-brand-accent-lt/25 hover:border-brand-accent hover:bg-brand-bg/30 text-left transition-all duration-150"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-bg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-accent/20 transition-colors">
                    <User size={18} className="text-brand-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="font-bold text-brand-primary text-sm">
                        Start without Resume
                      </p>
                      <ChevronRight
                        size={15}
                        className="text-brand-muted group-hover:translate-x-0.5 transition-transform"
                      />
                    </div>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      Answer a few questions about your background and goals.
                      We'll generate your roadmap from your profile.
                    </p>
                  </div>
                </button>
              </div>
            )}

            {/* Resume upload area */}
            {step === "uploading" && (
              <div>
                <button
                  onClick={() => setStep("choosing")}
                  className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-primary mb-4 transition-colors"
                >
                  ← Back to options
                </button>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={[
                    "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-all duration-200",
                    dragOver
                      ? "border-brand-accent bg-brand-bg/50"
                      : "border-brand-accent-lt/40 hover:border-brand-accent hover:bg-brand-bg/20",
                  ].join(" ")}
                >
                  {uploadMutation.isPending ? (
                    <>
                      <div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                      <p className="field-label">Analyzing your resume…</p>
                      <p className="meta-text">
                        This usually takes 10–20 seconds
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center">
                        <Upload size={22} className="text-brand-accent" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-brand-primary text-sm mb-0.5">
                          Drop your resume here
                        </p>
                        <p className="meta-text">
                          or click to browse -PDF only
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={onFileChange}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
