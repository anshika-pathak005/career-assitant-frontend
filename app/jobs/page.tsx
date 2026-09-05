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
    <div className="page-shell">
      <div className="page-container text-center">
        <Card variant="default" padding="lg">
          <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center mx-auto mb-4">
            <BriefcaseBusiness size={28} className="text-brand-accent" />
          </div>
          <h1 className="page-title mb-2">
            Job Matching
          </h1>
          <p className="page-subtitle mx-auto mb-4">
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
