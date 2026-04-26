import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  FileSearch,
  Target,
  MessageSquare,
} from "lucide-react";
import Button from "@/components/ui/Button";
import HowItWorks from "@/components/sections/HowItWorks";
import WhatYouGet from "@/components/sections/WhatYouGet";
import BeforeAfter from "@/components/sections/BeforeAfter";
import WhoIsItFor from "@/components/sections/WhoIsItFor";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

const features = [
  {
    icon: FileSearch,
    title: "Resume Analysis",
    desc: "AI scans your resume and gives you actionable improvements instantly.",
  },
  {
    icon: Target,
    title: "Skill Gap Detection",
    desc: "Know exactly what to learn next for your dream role.",
  },
  {
    icon: MessageSquare,
    title: "AI Career Coach",
    desc: "Chat with your personal AI coach anytime, 24/7.",
  },
  {
    icon: Sparkles,
    title: "Job Matching",
    desc: "Get matched to jobs that align with your profile and goals.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#C2E8FF] relative overflow-x-hidden">
      {/* ── Subtle background blobs ─────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/25 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-[#7AC4FF]/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-white/20 blur-3xl" />
      </div>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-24 text-center">
        <div className="animate-fade-up inline-flex items-center gap-2 bg-white/70 border border-[#7A9BC4]/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
          <Sparkles size={13} className="text-[#557EB2]" />
          <span className="text-xs font-semibold text-[#042558]">
            AI-Powered Career Growth Platform
          </span>
        </div>

        <h1 className="animate-fade-up delay-1 font-display font-bold text-5xl sm:text-6xl lg:text-8xl leading-[1.1] mb-6 text-[#000F22]">
          Your career, <br />
          <span className="text-[#557EB2]">accelerated by AI</span>
        </h1>

        <p className="animate-fade-up delay-2 text-[#537FAF] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Resume analysis, skill gap detection, personalized job matching and a
          24/7 AI career coach — all in one place.
        </p>

        <div className="animate-fade-up delay-3 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/register">
            <Button size="lg" rightIcon={<ArrowRight size={16} />}>
              Start for free
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="ghost">
              Sign in to your account
            </Button>
          </Link>
        </div>

        {/* Social proof mini strip */}
        <p className="animate-fade-up delay-3 mt-10 text-[#537FAF]/70 text-xs">
          Trusted by <span className="font-bold text-[#557EB2]">10,000+</span>{" "}
          students and job seekers worldwide
        </p>
      </section>

      {/* ── Features ────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="animate-fade-up bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#7A9BC4]/15 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${0.15 + i * 0.07}s` }}
            >
              <div className="w-10 h-10 bg-[#C2E8FF] rounded-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon size={18} className="text-[#557EB2]" />
              </div>
              <h3 className="font-bold text-[#000F22] text-sm mb-1.5">
                {title}
              </h3>
              <p className="text-[#537FAF] text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/30 to-transparent" />
      </div>

      {/* ── How It Works ────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/30 to-transparent" />
      </div>

      {/* ── What You Get ────────────────────────────────────────── */}
      <WhatYouGet />

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/30 to-transparent" />
      </div>

      {/* ── Before vs After ─────────────────────────────────────── */}
      <BeforeAfter />

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/30 to-transparent" />
      </div>

      {/* ── Who Is It For ───────────────────────────────────────── */}
      <WhoIsItFor />

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/30 to-transparent" />
      </div>

      {/* ── Testimonials ────────────────────────────────────────── */}
      <Testimonials />

      {/* ── Final CTA ───────────────────────────────────────────── */}
      <FinalCTA />

      {/* ── Footer note ─────────────────────────────────────────── */}
      <div className="text-center pb-10 text-[#537FAF]/50 text-xs">
        © {new Date().getFullYear()} CareerPilot · Built with ❤️ for job seekers
      </div>
    </main>
  );
}
