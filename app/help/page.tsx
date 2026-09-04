// app/help/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle, Mail, Phone, MessageCircle, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ComingSoonModal from "@/components/ui/ComingSoonModal";
import { useAuth } from "@/hooks/useAuth";
import FullPageSpinner from "@/components/ui/FullPageSpinner";

export default function HelpPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
    // Show modal after page loads
    setIsModalOpen(true);
  }, [authLoading, isAuthenticated, router]);

  if (authLoading) {
    return <FullPageSpinner />;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <Card variant="default" padding="lg">
          <div className="w-16 h-16 rounded-full bg-[#C2E8FF] flex items-center justify-center mx-auto mb-4">
            <HelpCircle size={28} className="text-[#557EB2]" />
          </div>
          <h1 className="font-display text-[#000F22] text-2xl mb-2">
            Help & Support
          </h1>
          <p className="text-sm text-[#537FAF] mb-6">
            Get answers to your questions and reach out to our support team.
          </p>

          {/* Contact Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-[#C2E8FF]/30 rounded-lg">
              <Mail size={20} className="text-[#557EB2] mx-auto mb-2" />
              <p className="text-xs font-semibold text-[#000F22]">Email Us</p>
              <p className="text-xs text-[#537FAF]">support@careerpilot.com</p>
            </div>
            <div className="p-4 bg-[#C2E8FF]/30 rounded-lg">
              <MessageCircle
                size={20}
                className="text-[#557EB2] mx-auto mb-2"
              />
              <p className="text-xs font-semibold text-[#000F22]">Live Chat</p>
              <p className="text-xs text-[#537FAF]">Coming Soon</p>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            rightIcon={<Sparkles size={14} />}
          >
            Browse Help Center
          </Button>
        </Card>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        featureName="Help Center and detailed documentation"
      />
    </div>
  );
}
