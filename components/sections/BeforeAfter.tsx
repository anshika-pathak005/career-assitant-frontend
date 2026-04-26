import { XCircle, CheckCircle2 } from "lucide-react";

const before = [
  "Confused about what skills to learn next",
  "Sending random job applications blindly",
  "Getting vague or no resume feedback",
  "No clear roadmap for your career",
];

const after = [
  "Clear, prioritized skill gap report",
  "Step-by-step, targeted learning plan",
  "Optimized ATS resume with a score",
  "Matched to roles you're ready for today",
];

export default function BeforeAfter() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#557EB2] bg-[#557EB2]/10 px-4 py-1.5 rounded-full mb-4">
          The difference
        </span>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#000F22] leading-tight">
          See the difference <span className="text-[#557EB2]">AI makes</span>
        </h2>
        <p className="mt-4 text-[#537FAF] text-base max-w-xl mx-auto leading-relaxed">
          Stop guessing. Start growing with clarity and direction.
        </p>
      </div>

      {/* Split cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Before */}
        <div className="rounded-2xl border border-red-200/60 bg-gradient-to-br from-red-50/70 to-white p-8 shadow-card">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <h3 className="font-bold text-red-600 text-sm uppercase tracking-widest">
              Before CareerPilot
            </h3>
          </div>
          <ul className="space-y-4">
            {before.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                <span className="text-[#3a3a4a] text-sm leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* After */}
        <div className="rounded-2xl border border-[#7A9BC4]/30 bg-gradient-to-br from-[#C2E8FF]/50 to-white p-8 shadow-card ring-2 ring-[#557EB2]/10">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#557EB2]" />
            <h3 className="font-bold text-[#557EB2] text-sm uppercase tracking-widest">
              After CareerPilot
            </h3>
          </div>
          <ul className="space-y-4">
            {after.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  className="text-[#557EB2] shrink-0 mt-0.5"
                />
                <span className="text-[#000F22] text-sm leading-relaxed font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
