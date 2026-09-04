// app/jobs/page.tsx

"use client";

import { useState } from "react";
import ComingSoonModal from "@/components/ui/ComingSoonModal";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { BriefcaseBusiness } from "lucide-react";

// Auth is handled by useRouteGuard in ClientLayoutWrapper - this page only
// renders once the guard has confirmed the user is logged in.
export default function JobsPage() {
  const [isModalOpen, setIsModalOpen] = useState(true); // Open by default

  return (
    <div className="min-h-screen bg-brand-bg py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Card variant="default" padding="lg">
          <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center mx-auto mb-4">
            <BriefcaseBusiness size={28} className="text-brand-accent" />
          </div>
          <h1 className="font-display text-brand-primary text-2xl mb-2">
            Job Matching
          </h1>
          <p className="text-sm text-brand-muted mb-4">
            Find your dream job based on your skills and preferences.
          </p>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Browse Jobs
          </Button>
        </Card>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        featureName="Job matching and recommendations"
      />
    </div>
  );
}
