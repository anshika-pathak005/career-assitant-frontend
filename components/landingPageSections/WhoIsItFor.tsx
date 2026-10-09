// components/sections/WhoIsItFor.tsx

import { GraduationCap, UserCheck, RefreshCcw, Code2 } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    label: "Students",
    title: "Build your career from zero",
    desc: "Get a clear starting point and roadmap even with no experience.",
  },
  {
    icon: UserCheck,
    label: "Freshers",
    title: "Land your first job faster",
    desc: "Stand out with an optimized resume and targeted applications.",
  },
  {
    icon: RefreshCcw,
    label: "Career Switchers",
    title: "Move into tech smoothly",
    desc: "Identify transferable skills and what to learn to make the leap.",
  },
  {
    icon: Code2,
    label: "Developers",
    title: "Upgrade your skills & roles",
    desc: "Find the next role tier, skill gap, and projects to get there.",
  },
];

export default function WhoIsItFor() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-4 py-1.5 rounded-full mb-4">
          Who it's for
        </span>
        <h2 className="font-display font-bold text-5xl text-brand-primary leading-tight">
          Built for <span className="text-brand-accent">learners like you</span>
        </h2>
        <p className="mt-4 text-brand-muted text-base max-w-xl mx-auto leading-relaxed">
          Whether you're just starting out or leveling up -CareerPilot meets you
          where you are.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {audiences.map(({ icon: Icon, label, title, desc }, i) => (
          <div
            key={label}
            className="group relative bg-white rounded-2xl p-6 border border-brand-accent-lt/15 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-bg/0 to-brand-bg/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <span className="inline-block text-2xs font-bold uppercase tracking-widest text-brand-accent bg-brand-bg/70 px-2.5 py-1 rounded-full mb-4">
                {label}
              </span>
              <div className="w-11 h-11 bg-brand-bg/60 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-accent/10 transition-all duration-300">
                <Icon size={20} className="text-brand-accent" />
              </div>
              <h3 className="font-bold text-brand-primary text-sm mb-2">
                {title}
              </h3>
              <p className="text-brand-muted text-xs leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
