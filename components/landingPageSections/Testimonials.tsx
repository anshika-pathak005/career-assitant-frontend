// components/sections/Testimonials.tsx

import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya S.",
    role: "CS Student, Delhi",
    text: "CareerPilot helped me understand exactly what skills to learn. I finally had a clear roadmap instead of randomly watching tutorials.",
    score: "Resume: 40 → 78",
    initials: "PS",
  },
  {
    name: "Arjun M.",
    role: "Fresher, Bangalore",
    text: "My resume score jumped significantly after using the AI feedback. Got interview calls within two weeks of applying.",
    score: "3 offers in 30 days",
    initials: "AM",
  },
  {
    name: "Sneha R.",
    role: "Career Switcher",
    text: "I was in marketing, now I'm a junior frontend dev. CareerPilot mapped out exactly what I needed to learn and build.",
    score: "Switched in 6 months",
    initials: "SR",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#557EB2] bg-[#557EB2]/10 px-4 py-1.5 rounded-full mb-4">
          Testimonials
        </span>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#000F22] leading-tight">
          Loved by <span className="text-[#557EB2]">job seekers</span>
        </h2>
        <p className="mt-4 text-[#537FAF] text-base max-w-xl mx-auto leading-relaxed">
          Real people. Real results.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(({ name, role, text, score, initials }) => (
          <div
            key={name}
            className="group bg-white rounded-2xl p-7 border border-[#7A9BC4]/15 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-5"
          >
            <Quote size={20} className="text-[#7A9BC4] opacity-50" />
            <p className="text-[#3a4a5c] text-sm leading-relaxed flex-1">
              "{text}"
            </p>
            <span className="inline-block self-start text-[10px] font-bold text-[#557EB2] bg-[#C2E8FF]/70 border border-[#7A9BC4]/20 rounded-full px-3 py-1">
              {score}
            </span>
            <div className="flex items-center gap-3 pt-1 border-t border-[#7A9BC4]/10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#557EB2] to-[#7AC4FF] flex items-center justify-center text-white text-xs font-bold shrink-0">
                {initials}
              </div>
              <div>
                <p className="font-bold text-[#000F22] text-xs">{name}</p>
                <p className="text-[#537FAF] text-[11px]">{role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
