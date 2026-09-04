// components/roadmap/ProfileIncompleteScreen.tsx

import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

/**
 * Shown when the user reaches roadmap generation before finishing
 * onboarding — we need their dream job and background first.
 */
export default function ProfileIncompleteScreen() {
  return (
    <div className="min-h-screen bg-[#C2E8FF] flex items-center justify-center px-4">
      <Card variant="default" padding="lg" className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-[#C2E8FF] flex items-center justify-center mx-auto mb-4">
          <BriefcaseBusiness size={28} className="text-[#557EB2]" />
        </div>
        <h2 className="font-display text-[#000F22] text-2xl mb-2">
          Complete Your Profile First
        </h2>
        <p className="text-sm text-[#537FAF] mb-6 leading-relaxed">
          To generate a personalized career roadmap, we need some basic
          information about your background and career goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/register/step2">
            <Button variant="primary" size="md">
              Complete Profile
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="md">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
