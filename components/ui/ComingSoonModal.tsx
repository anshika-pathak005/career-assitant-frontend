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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-primary/60 backdrop-blur-sm animate-fade-in px-4">
      <Card
        variant="default"
        padding="lg"
        className="max-w-md w-full text-center animate-fade-up"
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="tap-target text-brand-muted hover:text-brand-primary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center mx-auto mb-4">
          <Rocket size={28} className="text-brand-accent" />
        </div>

        <h3 className="subsection-title mb-2">
          Coming Soon!
        </h3>

        <p className="body-text mb-4">
          {featureName} is currently under development. We're working hard to
          bring this to you as soon as possible.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-brand-accent-lt mb-4">
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
