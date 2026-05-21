// app/jobs/page.tsx

"use client";

import { useState } from "react";
import ComingSoonModal from "@/components/ui/ComingSoonModal";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { BriefcaseBusiness, Search } from "lucide-react";

export default function JobsPage() {
  const [isModalOpen, setIsModalOpen] = useState(true); // Open by default
  // OR use button click to open

  return (
    <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Card variant="default" padding="lg">
          <div className="w-16 h-16 rounded-full bg-[#C2E8FF] flex items-center justify-center mx-auto mb-4">
            <BriefcaseBusiness size={28} className="text-[#557EB2]" />
          </div>
          <h1 className="font-display text-[#000F22] text-2xl mb-2">
            Job Matching
          </h1>
          <p className="text-sm text-[#537FAF] mb-4">
            Find your dream job based on your skills and preferences.
          </p>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            {/* <Search size={14} className="mr-2" /> */}
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
