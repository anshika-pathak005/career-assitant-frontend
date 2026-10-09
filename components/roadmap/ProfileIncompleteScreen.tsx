// components/roadmap/ProfileIncompleteScreen.tsx

import Link from "next/link";
import { BriefcaseBusiness, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface ProfileIncompleteScreenProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  backHref?: string;
  backLabel?: string;
}

/**
 * Shown when the user reaches roadmap generation or resume analysis
 * before finishing onboarding/profile setup - we need their dream job and background first.
 */
export default function ProfileIncompleteScreen({
  title = "Complete Your Profile First",
  description = "To generate a personalized career roadmap, we need some basic information about your background and career goals.",
  buttonText = "Complete Profile",
  buttonHref = "/register/step2",
  backHref = "/dashboard",
  backLabel = "Back to Dashboard",
}: ProfileIncompleteScreenProps = {}) {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <Card variant="default" padding="lg" className="max-w-md text-center shadow-lg">
        <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center mx-auto mb-4 border border-brand-accent-lt/20 shadow-inner">
          <BriefcaseBusiness size={28} className="text-brand-accent" />
        </div>
        <h2 className="section-title mb-2">{title}</h2>
        <p className="body-text mb-6">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={buttonHref}>
            <Button variant="primary" size="md" rightIcon={<ArrowRight size={14} />}>
              {buttonText}
            </Button>
          </Link>
          <Link href={backHref}>
            <Button variant="ghost" size="md">
              {backLabel}
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
