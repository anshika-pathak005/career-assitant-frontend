"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import type { UserProfile } from "@/services/userService";

/* ─── Which profile fields count toward completion ───────────────── */
const COMPLETION_FIELDS: { key: keyof UserProfile; label: string }[] = [
  { key: "userCategory", label: "Role" },
  { key: "goalType", label: "Career Goal" },
  { key: "dreamJob", label: "Dream Job" },
  { key: "industries", label: "Industries" },
  { key: "skills", label: "Skills" },
  { key: "projectLevel", label: "Project Level" },
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

  // Don't show if truly complete
  if (profile.isProfileComplete && pct === 100) return null;

  const missing = COMPLETION_FIELDS.filter(({ key }) => {
    const val = profile[key];
    if (Array.isArray(val)) return val.length === 0;
    return val === null || val === undefined || val === "";
  }).slice(0, 3); // show max 3 missing items

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#7A9BC4]/25 bg-white p-5 shadow-card">
      {/* Accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-[#557EB2]" />

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pl-3">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-[#557EB2] mb-0.5">
            Profile Incomplete
          </p>
          <p className="font-bold text-[#000F22] text-sm mb-2">
            Complete your profile to unlock personalized AI career guidance
          </p>

          {/* Progress bar */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-2 bg-[#C2E8FF] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#557EB2] rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#557EB2] flex-shrink-0">
              {pct}%
            </span>
          </div>

          {/* Missing fields */}
          {missing.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {missing.map(({ label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#537FAF] bg-[#C2E8FF] px-2 py-0.5 rounded-full"
                >
                  <Circle size={7} />
                  {label} missing
                </span>
              ))}
              {COMPLETION_FIELDS.filter(({ key }) => {
                const val = profile[key];
                if (Array.isArray(val)) return val.length === 0;
                return val === null || val === undefined || val === "";
              }).length > 3 && (
                <span className="text-[10px] font-semibold text-[#537FAF]">
                  +
                  {COMPLETION_FIELDS.filter(({ key }) => {
                    const val = profile[key];
                    if (Array.isArray(val)) return val.length === 0;
                    return val === null || val === undefined || val === "";
                  }).length - 3}{" "}
                  more
                </span>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          href="/register/step2"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-[#000F22] hover:bg-[#042558] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
        >
          Complete Profile
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
