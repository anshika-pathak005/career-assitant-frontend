// components/ui/ComingSoonModal.tsx

"use client";

import { X, Sparkles, Clock, Rocket } from "lucide-react";
import Button from "./Button";
import Card from "./Card";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export default function ComingSoonModal({
  isOpen,
  onClose,
  featureName = "This feature",
}: ComingSoonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000F22]/60 backdrop-blur-sm animate-fade-in px-4">
      <Card
        variant="default"
        padding="lg"
        className="max-w-md w-full text-center animate-fade-up"
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-[#537FAF] hover:text-[#000F22] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="w-16 h-16 rounded-full bg-[#C2E8FF] flex items-center justify-center mx-auto mb-4">
          <Rocket size={28} className="text-[#557EB2]" />
        </div>

        <h3 className="font-display text-[#000F22] text-xl mb-2">
          Coming Soon!
        </h3>

        <p className="text-sm text-[#537FAF] mb-4 leading-relaxed">
          {featureName} is currently under development. We're working hard to
          bring this to you as soon as possible.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-[#7A9BC4] mb-4">
          <Clock size={12} />
          <span>Stay tuned for updates</span>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={onClose}
          className="w-full"
        >
          Got it
        </Button>
      </Card>
    </div>
  );
}
