"use client";

import Link from "next/link";
import { ArrowRight, Circle, Sparkles, Target, Clock } from "lucide-react";
import type { UserProfile } from "@/types/profile.types";

/* ─── Which profile fields count toward completion ───────────────── */
const COMPLETION_FIELDS: { key: keyof UserProfile; label: string }[] = [
  { key: "userCategory", label: "Role" },
  { key: "dreamJob", label: "Dream Job" },
  { key: "skills", label: "Skills" },
  { key: "industries", label: "Industries" },
  { key: "experienceYears", label: "Experience" },
  { key: "workPreference", label: "Work Preference" },
];

function getCompletionPercent(profile: UserProfile): number {
  const filled = COMPLETION_FIELDS.filter(({ key }) => {
    const val = profile[key];
    if (Array.isArray(val)) return val.length > 0;
    return val !== null && val !== undefined && val !== "";
  }).length;
  return Math.round((filled / COMPLETION_FIELDS.length) * 100);
}

interface Props {
  profile: UserProfile;
}

export default function ProfileCompletionBanner({ profile }: Props) {
  const pct = getCompletionPercent(profile);

  if (profile.isProfileComplete && pct === 100) return null;

  const missingFields = COMPLETION_FIELDS.filter(({ key }) => {
    const val = profile[key];
    if (Array.isArray(val)) return val.length === 0;
    return val === null || val === undefined || val === "";
  });

  const missing = missingFields.slice(0, 4);

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-[#C2E8FF]/20 border border-[#7A9BC4]/20 shadow-md">
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#557EB2] to-[#C2E8FF]" />

      <div className="p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5">
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-[#C2E8FF] flex items-center justify-center">
                <Sparkles size={11} className="text-[#557EB2]" />
              </div>
              <span className="text-[10px] font-semibold text-[#557EB2] uppercase tracking-wider">
                Get Started
              </span>
            </div>

            <h3 className="font-display text-[#000F22] text-xl sm:text-2xl mb-1">
              Complete your profile to unlock your career roadmap
            </h3>

            <p className="text-sm text-[#537FAF] leading-relaxed max-w-lg">
              Tell us about your skills, experience, and career preferences.
              We'll create a personalized AI-powered roadmap tailored just for
              you.
            </p>

            {/* Progress Section */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-[#537FAF] mb-1">
                <span>Profile completion</span>
                <span className="font-semibold text-[#557EB2]">{pct}%</span>
              </div>
              <div className="h-1.5 bg-[#C2E8FF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#557EB2] rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* Missing Fields */}
            {missing.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-[#537FAF] mb-1.5">
                  Missing information:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {missing.map(({ label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1 text-[10px] font-medium text-[#537FAF] bg-[#C2E8FF] px-2 py-0.5 rounded-full"
                    >
                      <Circle size={6} />
                      {label}
                    </span>
                  ))}
                  {missingFields.length > 4 && (
                    <span className="text-[10px] font-medium text-[#537FAF]">
                      +{missingFields.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right CTA */}
          <div className="flex-shrink-0 text-center lg:text-right">
            <Link href="/register/step2">
              <button className="inline-flex items-center gap-2 bg-[#000F22] hover:bg-[#042558] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all hover:shadow-md group">
                Complete Profile
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </Link>
            <p className="text-[10px] text-[#7A9BC4] mt-1.5">
              Takes less than 2 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
