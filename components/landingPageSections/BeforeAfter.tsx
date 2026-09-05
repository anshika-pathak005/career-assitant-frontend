// components/sections/BeforeAfter.tsx

import {
  XCircle,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Target,
  FileText,
  MapIcon,
  Clock,
  Brain,
  Rocket,
} from "lucide-react";

const before = [
  {
    text: "Wasting months learning random technologies",
    icon: Clock,
  },
  {
    text: "No idea what skills recruiters actually want",
    icon: Target,
  },
  {
    text: "Following outdated or irrelevant tutorials",
    icon: Brain,
  },
  {
    text: "No way to track your learning progress",
    icon: TrendingUp,
  },
  {
    text: "Unsure if you're ready for job applications",
    icon: Rocket,
  },
];

const after = [
  {
    text: "AI-generated roadmap tailored to your dream job",
    icon: MapIcon,
    highlight: true,
  },
  {
    text: "Clear skill gaps with prioritized learning path",
    icon: Target,
    highlight: false,
  },
  {
    text: "Phase-wise structure with estimated timelines",
    icon: Clock,
    highlight: false,
  },
  {
    text: "Interactive progress tracking with checklists",
    icon: TrendingUp,
    highlight: false,
  },
  {
    text: "Step-by-step guidance until you're job-ready",
    icon: Rocket,
    highlight: false,
  },
];

export default function BeforeAfter() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
      <div className="text-center mb-10 sm:mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-4 py-1.5 rounded-full mb-3 sm:mb-4">
          The difference
        </span>
        <h2 className="font-display font-bold text-5xl text-brand-primary leading-tight">
          Before vs <span className="text-brand-accent">After CareerPilot</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-brand-muted text-base max-w-xl mx-auto leading-relaxed">
          Stop guessing. Start growing with a clear, AI-powered roadmap.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Before Card */}
        <div className="rounded-2xl border border-red-200/60 bg-gradient-to-br from-red-50/70 to-white p-8 shadow-card hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <h3 className="font-bold text-red-600 text-sm uppercase tracking-widest">
              Without CareerPilot
            </h3>
          </div>
          <ul className="space-y-4">
            {before.map((item) => (
              <li key={item.text} className="flex items-start gap-3 group">
                <XCircle
                  size={18}
                  className="text-red-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                />
                <span className="text-[#3a3a4a] text-sm leading-relaxed">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* After Card */}
        <div className="rounded-2xl border border-brand-accent-lt/30 bg-gradient-to-br from-brand-bg/50 to-white p-8 shadow-card ring-2 ring-brand-accent/20 hover:shadow-xl hover:ring-brand-accent/30 transition-all duration-300 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-brand-accent/10 blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <h3 className="font-bold text-brand-accent text-sm uppercase tracking-widest">
                With CareerPilot
              </h3>
              <Sparkles size={12} className="text-brand-accent ml-1" />
            </div>
            <ul className="space-y-4">
              {after.map((item) => (
                <li
                  key={item.text}
                  className={`flex items-start gap-3 group ${item.highlight ? "bg-brand-accent/5 -mx-2 px-2 py-1.5 rounded-lg" : ""}`}
                >
                  <CheckCircle2
                    size={18}
                    className={`shrink-0 mt-0.5 transition-transform group-hover:scale-110 ${item.highlight ? "text-brand-success" : "text-brand-accent"}`}
                  />
                  <span
                    className={`text-sm leading-relaxed ${item.highlight ? "text-brand-primary font-semibold" : "text-brand-primary"}`}
                  >
                    {item.text}
                  </span>
                  {item.highlight && (
                    <span className="text-3xs font-bold text-brand-success bg-brand-success/10 px-1.5 py-0.5 rounded-full ml-auto">
                      KEY BENEFIT
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-1.5 border border-brand-accent-lt/20">
          <Sparkles size={10} className="text-brand-accent" />
          <span className="text-2xs text-brand-muted">
            Join <span className="font-bold text-brand-accent">10,000+</span>{" "}
            learners who transformed their careers
          </span>
        </div>
      </div>
    </section>
  );
}
