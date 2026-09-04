// components/dashboard/FeatureShowcase.tsx

"use client";

import {
  MapIcon,
  TrendingUp,
  Calendar,
  MessageSquare,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";
import Card from "@/components/ui/Card";

const FEATURES = [
  {
    icon: MapIcon,
    title: "Personalized Roadmap",
    description: "Step-by-step learning path tailored to your dream job",
  },
  {
    icon: TrendingUp,
    title: "Skill Gap Analysis",
    description: "Identify what skills you need to learn and improve",
  },
  {
    icon: Calendar,
    title: "Weekly Learning Plan",
    description: "Structured timeline with estimated hours per week",
  },
  {
    icon: MessageSquare,
    title: "AI Career Assistant",
    description: "Get instant answers to your career questions",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job Recommendations",
    description: "Discover roles that match your skills and goals",
  },
];

export default function FeatureShowcase() {
  return (
    <div className="space-y-4">
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-1.5 bg-brand-bg/50 rounded-full px-3 py-1 mb-2">
          <Sparkles size={12} className="text-brand-accent" />
          <span className="text-[10px] font-semibold text-brand-accent uppercase tracking-wider">
            What you'll get
          </span>
        </div>
        {/* <h4 className="font-display text-brand-primary text-lg">
          After completing your profile
        </h4> */}
        <p className="text-xs text-brand-muted mt-0.5">
          Unlock these features to accelerate your career journey
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {FEATURES.map((feature, idx) => (
          <div
            key={feature.title}
            className="bg-white/50 rounded-lg border border-brand-accent-lt/15 p-3.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-bg flex items-center justify-center flex-shrink-0">
                <feature.icon size={15} className="text-brand-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-primary">
                  {feature.title}
                </p>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
