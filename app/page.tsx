import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  FileSearch,
  Target,
  MessageSquare,
} from "lucide-react";
import Button from "@/components/ui/Button";

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
    <main className="min-h-screen bg-[#C2E8FF]">
      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#000F22] rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">CA</span>
          </div>
          <span className="font-display italic text-[#000F22] text-xl">
            CareerPilot
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="animate-fade-up inline-flex items-center gap-2 bg-white/70 border border-[#7A9BC4]/30 rounded-full px-4 py-1.5 mb-8">
          <Sparkles size={13} className="text-[#557EB2]" />
          <span className="text-xs font-semibold text-[#042558]">
            AI-Powered Career Growth Platform
          </span>
        </div>

        <h1 className="animate-fade-up delay-1 font-display italic text-[#000F22] text-5xl sm:text-6xl leading-[1.15] mb-6">
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
      </section>

      {/* ── Features ────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="animate-fade-up bg-white rounded-lg p-6 border border-[#7A9BC4]/15 shadow-card hover:shadow-lg transition-shadow"
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
      </section>
    </main>
  );
}
