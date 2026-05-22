// components/sections/HowItWorks.tsx

import {
  ClipboardList,
  Sparkles,
  MapIcon,
  TrendingUp,
  FileText,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Fill your details",
    desc: "Tell us your dream job, current skills, experience, and learning preferences.",
    highlight: false,
  },
  {
    icon: Sparkles,
    step: "02",
    title: "AI generates roadmap",
    desc: "Our AI creates a personalized, step-by-step learning plan just for you.",
    highlight: true,
    badge: "Core Feature",
  },
  {
    icon: MapIcon,
    step: "03",
    title: "Follow your path",
    desc: "Complete phases, mark steps done, and track your progress.",
    highlight: false,
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Achieve your goal",
    desc: "Stay on course and land your dream job with confidence.",
    highlight: false,
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#557EB2] bg-[#557EB2]/10 px-4 py-1.5 rounded-full mb-4">
          How it works
        </span>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#000F22] leading-tight">
          Your journey to <span className="text-[#557EB2]">career success</span>
        </h2>
        <p className="mt-4 text-[#537FAF] text-base max-w-xl mx-auto leading-relaxed">
          Fill your details, get your roadmap, and start learning — it's that
          simple.
        </p>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/40 to-transparent z-0" />

        {steps.map(({ icon: Icon, step, title, desc, highlight, badge }, i) => (
          <div
            key={step}
            className={`
              relative z-10 group rounded-2xl p-6 border shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300
              ${
                highlight
                  ? "bg-gradient-to-br from-[#557EB2] to-[#042558] border-[#557EB2]/50 ring-2 ring-[#557EB2]/30"
                  : "bg-white border-[#7A9BC4]/15"
              }
            `}
          >
            <span
              className={`
              absolute -top-3 left-5 text-[10px] font-black tracking-wider rounded-full px-2.5 py-0.5
              ${
                highlight
                  ? "bg-amber-400 text-[#000F22]"
                  : "text-[#557EB2] bg-[#C2E8FF] border border-[#7A9BC4]/30"
              }
            `}
            >
              STEP {step}
            </span>

            <div
              className={`
              w-12 h-12 rounded-xl flex items-center justify-center mb-5 mt-2 group-hover:scale-110 transition-transform duration-300
              ${
                highlight
                  ? "bg-white/20 backdrop-blur"
                  : "bg-gradient-to-br from-[#C2E8FF] to-[#7AC4FF]/40"
              }
            `}
            >
              <Icon
                size={20}
                className={highlight ? "text-white" : "text-[#557EB2]"}
              />
            </div>

            <h3
              className={`font-bold text-sm mb-2 ${highlight ? "text-white" : "text-[#000F22]"}`}
            >
              {title}
            </h3>

            <p
              className={`text-xs leading-relaxed ${highlight ? "text-blue-100" : "text-[#537FAF]"}`}
            >
              {desc}
            </p>

            {badge && (
              <div className="mt-3 flex items-center gap-1">
                <Sparkles size={10} className="text-amber-400" />
                <span className="text-[10px] text-amber-400 font-medium">
                  {badge}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Side note about resume analysis */}
      <div className="mt-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 border border-[#7A9BC4]/20">
          <FileText size={12} className="text-[#557EB2]" />
          <span className="text-xs text-[#537FAF]">
            Want resume analysis too?{" "}
            <span className="font-medium text-[#557EB2]">
              Upload your resume
            </span>{" "}
            separately anytime
          </span>
        </div>
      </div>
    </section>
  );
}
