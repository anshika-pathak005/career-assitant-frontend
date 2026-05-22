// app/page.tsx

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  FileText,
  MapIcon,
  MessageSquare,
  BriefcaseBusiness,
} from "lucide-react";
import Button from "@/components/ui/Button";
import HowItWorks from "@/components/landingPageSections/HowItWorks";
import WhatYouGet from "@/components/landingPageSections/WhatYouGet";
import BeforeAfter from "@/components/landingPageSections/BeforeAfter";
import WhoIsItFor from "@/components/landingPageSections/WhoIsItFor";
import Testimonials from "@/components/landingPageSections/Testimonials";
import FinalCTA from "@/components/landingPageSections/FinalCTA";
import RoadmapPreview from "@/components/landingPageSections/RoadmapPreview";
import ResumePreview from "@/components/landingPageSections/ResumePreview";

const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    desc: "AI scans your resume and gives you actionable improvements instantly.",
  },
  {
    icon: MapIcon,
    title: "Career Roadmap",
    desc: "Personalized step-by-step plan tailored to your dream job.",
  },
  {
    icon: MessageSquare,
    title: "AI Career Coach",
    desc: "Chat with your personal AI coach anytime, 24/7.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job Matching",
    desc: "Get matched to jobs that align with your profile and goals.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#C2E8FF] relative overflow-x-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/25 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-[#7AC4FF]/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-white/20 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-24 text-center">
        <div className="animate-fade-up inline-flex items-center gap-2 bg-white/70 border border-[#7A9BC4]/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
          <Sparkles size={13} className="text-[#557EB2]" />
          <span className="text-xs font-semibold text-[#042558]">
            AI-Powered Career Growth Platform
          </span>
        </div>

        <h1 className="animate-fade-up delay-1 font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.1] mb-6 text-[#000F22]">
          Your career, <br />
          <span className="text-[#557EB2]">accelerated by AI</span>
        </h1>

        <p className="animate-fade-up delay-2 text-[#537FAF] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Resume analysis, personalized career roadmap, AI career coach, and job
          matching — all in one place.
        </p>

        <div className="animate-fade-up delay-3 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/register">
            <Button size="lg" rightIcon={<ArrowRight size={16} />}>
              Start for free
            </Button>
          </Link>
          <Link href="/roadmap">
            <Button size="lg" variant="ghost">
              Generate Your Roadmap
            </Button>
          </Link>
        </div>

        <p className="animate-fade-up delay-3 mt-10 text-[#537FAF]/70 text-xs">
          Trusted by <span className="font-bold text-[#557EB2]">10,000+</span>{" "}
          students and job seekers worldwide
        </p>
      </section>

      {/* Features Grid */}
      {/* <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="animate-fade-up bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#7A9BC4]/15 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${0.15 + i * 0.07}s` }}
            >
              <div className="w-10 h-10 bg-[#C2E8FF] rounded-md flex items-center justify-center mb-4">
                <Icon size={18} className="text-[#557EB2]" />
              </div>
              <h3 className="font-bold text-[#000F22] text-sm mb-1.5">
                {title}
              </h3>
              <p className="text-[#537FAF] text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Dividers between sections */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/30 to-transparent" />
      </div>

      <HowItWorks />

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/30 to-transparent" />
      </div>

      <WhatYouGet />

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/30 to-transparent" />
      </div>

      <BeforeAfter />

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/30 to-transparent" />
      </div>

      <RoadmapPreview />

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/30 to-transparent" />
      </div>

      <ResumePreview />

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/30 to-transparent" />
      </div>

      <WhoIsItFor />

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/30 to-transparent" />
      </div>

      <Testimonials />

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/30 to-transparent" />
      </div>

      <FinalCTA />

      <div className="text-center pb-10 text-[#537FAF]/50 text-xs">
        © {new Date().getFullYear()} CareerPilot · Built for your career growth
      </div>
    </main>
  );
}
