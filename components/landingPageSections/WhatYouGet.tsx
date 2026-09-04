// components/sections/WhatYouGet.tsx

import {
  FileText,
  MapIcon,
  MessageSquare,
  BriefcaseBusiness,
  TrendingUp,
  Award,
  Sparkles,
  Target,
} from "lucide-react";

const items = [
  {
    icon: MapIcon,
    title: "Personalized Career Roadmap",
    desc: "Step-by-step learning path designed around your dream job. Track your progress weekly.",
    color: "from-brand-accent/10 to-brand-bg/60",
    highlight: true,
    badge: "Most Popular",
  },
  {
    icon: FileText,
    title: "Resume Analysis",
    desc: "Get AI-powered ATS score and actionable improvement suggestions.",
    color: "from-blue-50 to-brand-bg/60",
    highlight: false,
  },
  {
    icon: MessageSquare,
    title: "AI Career Coach",
    desc: "Ask anything, get instant career guidance available 24/7.",
    color: "from-sky-50 to-brand-bg/50",
    highlight: false,
  },
  {
    icon: BriefcaseBusiness,
    title: "Job Role Matching",
    desc: "See all the roles you are qualified for right now.",
    color: "from-blue-50 to-indigo-50",
    highlight: false,
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    desc: "Monitor your learning journey and celebrate milestones.",
    color: "from-brand-bg/60 to-sky-50",
    highlight: false,
  },
  {
    icon: Award,
    title: "Skill Certification",
    desc: "Validate your skills with recommended certifications.",
    color: "from-indigo-50 to-brand-bg/50",
    highlight: false,
  },
];

export default function WhatYouGet() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-4 py-1.5 rounded-full mb-4">
          Everything you need
        </span>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-brand-primary leading-tight">
          All-in-one <span className="text-brand-accent">career growth</span>{" "}
          platform
        </h2>
        <p className="mt-4 text-brand-muted text-base max-w-xl mx-auto leading-relaxed">
          A complete AI-powered toolkit built for modern career growth.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(({ icon: Icon, title, desc, color, highlight, badge }, i) => (
          <div
            key={title}
            className={`
              group rounded-2xl p-6 border shadow-card hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300
              ${highlight 
                ? "bg-gradient-to-br from-brand-accent to-brand-secondary border-brand-accent/50 ring-2 ring-brand-accent/30 relative overflow-hidden" 
                : `bg-gradient-to-br ${color} border-brand-accent-lt/15`
              }
            `}
          >
            {badge && (
              <div className="absolute -top-2 -right-2">
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md">
                  <Sparkles size={8} />
                  {badge}
                </span>
              </div>
            )}
            
            <div className={`
              w-11 h-11 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300
              ${highlight 
                ? "bg-white/20 backdrop-blur" 
                : "bg-white/80 backdrop-blur"
              }
            `}>
              <Icon size={20} className={highlight ? "text-white" : "text-brand-accent"} />
            </div>
            
            <h3 className={`font-bold text-sm mb-2 ${highlight ? "text-white" : "text-brand-primary"}`}>
              {title}
            </h3>
            
            <p className={`text-xs leading-relaxed ${highlight ? "text-blue-100" : "text-brand-muted"}`}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}