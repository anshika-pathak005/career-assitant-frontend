"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { UserProfile } from "@/types/profile.types";

interface Props {
  profile: UserProfile;
}

export default function ProfileCompletionBanner({ profile }: Props) {
  // Simply check backend's isProfileComplete flag & dreamJob
  if (profile.isProfileComplete && profile.dreamJob?.trim()) return null;

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-brand-bg/20 border border-brand-accent-lt/20 shadow-md">
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-accent to-brand-bg" />

      <div className="p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5">
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-brand-bg flex items-center justify-center">
                <Sparkles size={11} className="text-brand-accent" />
              </div>
              <span className="text-2xs font-semibold text-brand-accent uppercase tracking-wider">
                Get Started
              </span>
            </div>

            <h3 className="section-title mb-1">
              Complete your profile to unlock your career roadmap
            </h3>

            <p className="text-sm text-brand-muted leading-relaxed max-w-lg">
              Tell us about your skills, experience, and career preferences.
              We'll create a personalized AI-powered roadmap tailored just for
              you.
            </p>
          </div>

          {/* Right CTA */}
          <div className="flex-shrink-0 text-center lg:text-right">
            <Link href="/register/step2">
              <button className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all hover:shadow-md group">
                Complete Profile
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </Link>
            <p className="text-2xs text-brand-accent-lt mt-1.5">
              Takes less than 2 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
