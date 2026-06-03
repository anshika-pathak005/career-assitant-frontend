// app/resume-analysis/analysis/page.tsx

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
  ArrowRight,
  BriefcaseBusiness,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { useUploadResume } from "@/hooks/useResumeAnalysis";

/* ─── File size limit (5MB) ─────────────────────────────────────── */
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["application/pdf"];

export default function ResumeUploadPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const uploadMutation = useUploadResume();

  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-[#537FAF] hover:text-[#042558] transition-colors mb-4"
          >
            ← Back
          </button>
        </div>

        {/* Main Card */}
        <Card variant="default" padding="lg" className="text-center">
          <Card
            variant="flat"
            padding="lg"
            className="relative overflow-hidden bg-gradient-to-br from-[#000F22] to-[#042558] border-none text-center mb-6"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#557EB2]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#7A9BC4]/10 blur-2xl" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <FileText size={28} className="text-white" />
              </div>

              <h1 className="font-display text-white text-2xl sm:text-3xl mb-2">
                Upload Your Resume
              </h1>

              <p className="text-[#7A9BC4] text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
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
                    ? "border-[#557EB2] bg-[#C2E8FF]/50"
                    : "border-[#7A9BC4]/40 hover:border-[#557EB2] hover:bg-[#C2E8FF]/20"
                }
              `}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#C2E8FF] flex items-center justify-center">
                  <Upload size={22} className="text-[#557EB2]" />
                </div>
                <div>
                  <p className="font-semibold text-[#000F22] text-sm mb-1">
                    Drag & drop your resume here
                  </p>
                  <p className="text-xs text-[#537FAF]">or click to browse</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[#7A9BC4] mt-2">
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
            <div className="border-2 border-[#557EB2] rounded-xl p-10 bg-[#C2E8FF]/30">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#557EB2]/20 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-[#557EB2] border-t-transparent rounded-full animate-spin" />
                </div>
                <div>
                  <p className="font-semibold text-[#000F22] text-sm mb-1">
                    Analyzing your resume...
                  </p>
                  <p className="text-xs text-[#537FAF]">
                    This usually takes 10-20 seconds
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* File Selected State */
            <div className="border-2 border-[#16A34A] rounded-xl p-6 bg-[#16A34A]/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#16A34A]/20 flex items-center justify-center">
                    <CheckCircle2 size={18} className="text-[#16A34A]" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[#000F22] text-sm">
                      {selectedFile?.name}
                    </p>
                    <p className="text-xs text-[#537FAF]">
                      {selectedFile &&
                        (selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                      MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearFile}
                  className="text-[#537FAF] hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-xs text-[#16A34A] mt-3 flex items-center gap-1">
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
          <div className="mt-8 pt-6 border-t border-[#7A9BC4]/15">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#C2E8FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield size={12} className="text-[#557EB2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#000F22]">
                    ATS Score
                  </p>
                  <p className="text-[10px] text-[#537FAF]">
                    Check recruiter compatibility
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#C2E8FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={12} className="text-[#557EB2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#000F22]">
                    Skill Gap Analysis
                  </p>
                  <p className="text-[10px] text-[#537FAF]">
                    Identify missing keywords
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#C2E8FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={12} className="text-[#557EB2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#000F22]">
                    Quick Analysis
                  </p>
                  <p className="text-[10px] text-[#537FAF]">
                    Results in seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Note */}
        <p className="text-center text-[10px] text-[#7A9BC4] mt-6">
          Your resume is secure and encrypted. We never share your data with
          third parties.
        </p>
      </div>
    </div>
  );
}
