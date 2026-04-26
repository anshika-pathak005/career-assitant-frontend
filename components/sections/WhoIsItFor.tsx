import { GraduationCap, UserCheck, RefreshCcw, Terminal } from "lucide-react";

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
    icon: Terminal,
    label: "Developers",
    title: "Upgrade your skills & roles",
    desc: "Find the next role tier, skill gap, and projects to get there.",
  },
];

export default function WhoIsItFor() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#557EB2] bg-[#557EB2]/10 px-4 py-1.5 rounded-full mb-4">
          Who it's for
        </span>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#000F22] leading-tight">
          Built for learners <span className="text-[#557EB2]">like you</span>
        </h2>
        <p className="mt-4 text-[#537FAF] text-base max-w-xl mx-auto leading-relaxed">
          Whether you're just starting out or leveling up — CareerPilot meets
          you where you are.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {audiences.map(({ icon: Icon, label, title, desc }, i) => (
          <div
            key={label}
            className="group relative bg-white rounded-2xl p-6 border border-[#7A9BC4]/15 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C2E8FF]/0 to-[#C2E8FF]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              {/* Badge */}
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#557EB2] bg-[#C2E8FF]/70 px-2.5 py-1 rounded-full mb-4">
                {label}
              </span>

              <div className="w-11 h-11 bg-[#C2E8FF]/60 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#557EB2]/10 transition-all duration-300">
                <Icon size={20} className="text-[#557EB2]" />
              </div>

              <h3 className="font-bold text-[#000F22] text-sm mb-2">{title}</h3>
              <p className="text-[#537FAF] text-xs leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
