// app/progress/page.tsx

"use client";

import { useState } from "react";
import { TrendingUp, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ComingSoonModal from "@/components/ui/ComingSoonModal";

// Auth is handled by useRouteGuard in ClientLayoutWrapper - this page only
// renders once the guard has confirmed the user is logged in.
export default function ProgressPage() {
  const [isModalOpen, setIsModalOpen] = useState(true); // Open by default

  return (
    <div className="page-shell">
      <div className="page-container-narrow text-center">
        <Card variant="default" padding="lg">
          <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center mx-auto mb-4">
            <TrendingUp size={28} className="text-brand-accent" />
          </div>
          <h1 className="page-title mb-2">
            Progress Tracker
          </h1>
          <p className="page-subtitle mx-auto mb-6">
            Track your learning journey and see how far you&apos;ve come.
          </p>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            rightIcon={<Sparkles size={14} />}
          >
            View Progress
          </Button>
        </Card>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        featureName="Progress tracking dashboard and analytics"
      />
    </div>
  );
}
