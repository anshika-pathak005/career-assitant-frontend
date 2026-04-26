import { BarChart2, Brain, Map, Briefcase, Code2, Bot } from "lucide-react";

const items = [
  {
    icon: BarChart2,
    title: "Smart Resume Scoring",
    desc: "Understand your ATS and hiring score instantly with clear suggestions.",
    color: "from-blue-50 to-[#C2E8FF]/60",
  },
  {
    icon: Brain,
    title: "AI Skill Gap Analysis",
    desc: "Know exactly what skills you're missing for your target role.",
    color: "from-indigo-50 to-blue-50",
  },
  {
    icon: Map,
    title: "Personalized Roadmap",
    desc: "Step-by-step learning path designed around your dream job.",
    color: "from-sky-50 to-[#C2E8FF]/50",
  },
  {
    icon: Briefcase,
    title: "Job Role Matching",
    desc: "See all the roles you are qualified for right now, instantly.",
    color: "from-blue-50 to-indigo-50",
  },
  {
    icon: Code2,
    title: "Project Suggestions",
    desc: "Build real-world portfolio projects that impress recruiters.",
    color: "from-[#C2E8FF]/60 to-sky-50",
  },
  {
    icon: Bot,
    title: "AI Career Coach",
    desc: "Ask anything, get instant career guidance available 24/7.",
    color: "from-indigo-50 to-[#C2E8FF]/50",
  },
];

export default function WhatYouGet() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#557EB2] bg-[#557EB2]/10 px-4 py-1.5 rounded-full mb-4">
          Everything you need
        </span>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#000F22] leading-tight">
          Everything you need to{" "}
          <span className="text-[#557EB2]">grow your career</span>
        </h2>
        <p className="mt-4 text-[#537FAF] text-base max-w-xl mx-auto leading-relaxed">
          A complete AI-powered toolkit built for modern career growth.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(({ icon: Icon, title, desc, color }, i) => (
          <div
            key={title}
            className={`group bg-gradient-to-br ${color} rounded-2xl p-6 border border-[#7A9BC4]/15 shadow-card hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-default`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="w-11 h-11 bg-white/80 backdrop-blur rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
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
