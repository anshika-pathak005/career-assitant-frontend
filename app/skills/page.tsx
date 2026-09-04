// app/skills/page.tsx

"use client";

import { useState } from "react";
import { Target, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ComingSoonModal from "@/components/ui/ComingSoonModal";

// Auth is handled by useRouteGuard in ClientLayoutWrapper - this page only
// renders once the guard has confirmed the user is logged in.
export default function SkillsPage() {
  const [isModalOpen, setIsModalOpen] = useState(true); // Open by default

  return (
    <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <Card variant="default" padding="lg">
          <div className="w-16 h-16 rounded-full bg-[#C2E8FF] flex items-center justify-center mx-auto mb-4">
            <Target size={28} className="text-[#557EB2]" />
          </div>
          <h1 className="font-display text-[#000F22] text-2xl mb-2">
            Skill Assessment
          </h1>
          <p className="text-sm text-[#537FAF] mb-6">
            Evaluate your current skills and identify areas for improvement.
          </p>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            rightIcon={<Sparkles size={14} />}
          >
            Start Assessment
          </Button>
        </Card>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        featureName="Skill Assessment quiz and personalized recommendations"
      />
    </div>
  );
}
