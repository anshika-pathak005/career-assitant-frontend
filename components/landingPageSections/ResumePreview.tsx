// components/sections/ResumePreview.tsx

import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Sparkles,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function ResumePreview() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left - Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#C2E8FF]/50 rounded-full px-3 py-1 mb-4">
            <FileText size={12} className="text-[#557EB2]" />
            <span className="text-[10px] font-semibold text-[#557EB2] uppercase tracking-wider">
              Bonus Feature
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl text-[#000F22] mb-3">
            Get your <span className="text-[#557EB2]">resume analyzed</span> too
          </h3>

          <p className="text-[#537FAF] leading-relaxed mb-4">
            While following your roadmap, upload your resume to get AI-powered
            insights and improve your chances of getting hired.
          </p>

          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle2
                size={14}
                className="text-[#557EB2] shrink-0 mt-0.5"
              />
              <span className="text-sm text-[#000F22]">
                ATS score to check recruiter compatibility
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2
                size={14}
                className="text-[#557EB2] shrink-0 mt-0.5"
              />
              <span className="text-sm text-[#000F22]">
                Skill gap analysis with missing keywords
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2
                size={14}
                className="text-[#557EB2] shrink-0 mt-0.5"
              />
              <span className="text-sm text-[#000F22]">
                Actionable suggestions to improve your resume
              </span>
            </li>
          </ul>

          <Link href="/resume-analysis">
            <Button
              variant="ghost"
              size="md"
              rightIcon={<ArrowRight size={14} />}
            >
              Try Resume Analysis
            </Button>
          </Link>
        </div>

        {/* Right - Preview Card (Same as before) */}
        <Card
          variant="default"
          padding="md"
          className="border border-[#7A9BC4]/20 shadow-card hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#C2E8FF] flex items-center justify-center">
                <FileText size={14} className="text-[#557EB2]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#557EB2]">
                  Latest Analysis
                </p>
                <p className="text-[10px] text-[#537FAF]">Test resume.pdf</p>
              </div>
            </div>
            <Sparkles size={12} className="text-[#7A9BC4]" />
          </div>

          <div className="flex items-center justify-around mb-4 py-2 bg-[#C2E8FF]/20 rounded-lg">
            <div className="text-center">
              <p className="text-xl font-bold text-[#D97706]">58</p>
              <p className="text-[9px] text-[#537FAF]">Overall</p>
            </div>
            <div className="w-px h-8 bg-[#7A9BC4]/30" />
            <div className="text-center">
              <p className="text-xl font-bold text-[#D97706]">50</p>
              <p className="text-[9px] text-[#537FAF]">ATS Score</p>
            </div>
            <div className="w-px h-8 bg-[#7A9BC4]/30" />
            <div className="text-center">
              <p className="text-sm font-semibold text-[#000F22]">Beginner</p>
              <p className="text-[9px] text-[#537FAF]">Readiness</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles size={10} className="text-amber-600" />
              <p className="text-[9px] font-semibold text-amber-700">
                Missing Skills Detected
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                Node.js
              </span>
              <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                Express.js
              </span>
              <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                MongoDB
              </span>
            </div>
          </div>   

          <p className="text-[9px] text-[#7A9BC4] text-center mt-2">
            Free analysis • No credit card required
          </p>
        </Card>
      </div>
    </section>
  );
}
