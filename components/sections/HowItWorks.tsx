import { Upload, Zap, Map, Briefcase } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload your resume",
    desc: "AI extracts your skills, experience, and structure in seconds.",
  },
  {
    icon: Zap,
    step: "02",
    title: "Get instant analysis",
    desc: "Receive your ATS score, skill gaps, and key improvements.",
  },
  {
    icon: Map,
    step: "03",
    title: "Get your career roadmap",
    desc: "A step-by-step learning plan with projects tailored to you.",
  },
  {
    icon: Briefcase,
    step: "04",
    title: "Apply smarter",
    desc: "Role suggestions and job matching aligned to your profile.",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#557EB2] bg-[#557EB2]/10 px-4 py-1.5 rounded-full mb-4">
          How it works
        </span>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#000F22] leading-tight">
          How <span className="text-[#557EB2]">CareerPilot</span> works
        </h2>
        <p className="mt-4 text-[#537FAF] text-base max-w-xl mx-auto leading-relaxed">
          From resume upload to job-ready — in four simple steps.
        </p>
      </div>

      {/* Steps */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Connector line (desktop) */}
        <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#7A9BC4]/40 to-transparent z-0" />

        {steps.map(({ icon: Icon, step, title, desc }, i) => (
          <div
            key={step}
            className="relative z-10 group bg-white rounded-2xl p-6 border border-[#7A9BC4]/15 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Step badge */}
            <span className="absolute -top-3 left-5 text-[10px] font-black tracking-wider text-[#557EB2] bg-[#C2E8FF] border border-[#7A9BC4]/30 rounded-full px-2.5 py-0.5">
              STEP {step}
            </span>

            <div className="w-12 h-12 bg-gradient-to-br from-[#C2E8FF] to-[#7AC4FF]/40 rounded-xl flex items-center justify-center mb-5 mt-2 group-hover:scale-110 transition-transform duration-300">
              <Icon size={20} className="text-[#557EB2]" />
            </div>
            <h3 className="font-bold text-[#000F22] text-sm mb-2">{title}</h3>
            <p className="text-[#537FAF] text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
