// app/pricing/page.tsx

"use client";

import { useRouter } from "next/navigation";
import {
  Check,
  Sparkles,
  Zap,
  Infinity,
  Target,
  FileText,
  MessageSquare,
  BriefcaseBusiness,
  TrendingUp,
  Shield,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import ComingSoonModal from "@/components/ui/ComingSoonModal";

/* ─── Feature Item Component ────────────────────────────────────── */
function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Check size={14} className="text-brand-success flex-shrink-0" />
      <span className="text-sm text-brand-muted">{text}</span>
    </div>
  );
}

/* ─── Pricing Card Component ────────────────────────────────────── */
function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  isPopular,
  onButtonClick,
  isLoading,
}: {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  onButtonClick: () => void;
  isLoading?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl ${isPopular ? "md:scale-105 shadow-2xl" : "shadow-lg"}`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-brand-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <Card
        variant="default"
        padding="lg"
        className={`h-full ${isPopular ? "border-brand-accent border-2" : "border-brand-accent-lt/20"}`}
      >
        <div className="text-center mb-6">
          <h3 className="subsection-title mb-1">{title}</h3>
          <p className="meta-text">{description}</p>
        </div>

        <div className="text-center mb-6">
          <span className="font-display text-brand-primary text-4xl font-bold">
            {price}
          </span>
          <span className="text-brand-muted text-sm">/{period}</span>
        </div>

        <div className="space-y-2 mb-6">
          {features.map((feature, idx) => (
            <FeatureItem key={idx} text={feature} />
          ))}
        </div>

        <Button
          variant={isPopular ? "primary" : "ghost"}
          size="lg"
          className="w-full"
          onClick={onButtonClick}
          isLoading={isLoading}
          rightIcon={isPopular ? <Sparkles size={14} /> : undefined}
        >
          {buttonText}
        </Button>
      </Card>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function PricingPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const handleUpgrade = () => {
    // Redirect to payment/checkout page (to be implemented) in future as of now show coming soon
    setIsUpgradeModalOpen(true);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="page-shell">
      <div className="page-container-wide">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
            <Sparkles size={12} className="text-brand-accent" />
            <span className="text-2xs font-medium text-brand-accent uppercase tracking-wider">
              Simple Pricing
            </span>
          </div>

          <h1 className="animate-fade-up delay-1 text-6xl mb-fluid-md">
            Choose the plan that{" "}
            <span className="text-brand-accent">fits your journey</span>
          </h1>

          <p className="text-sm text-brand-muted max-w-md mx-auto">
            Start for free, upgrade when you need more. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free Plan */}
          <PricingCard
            title="Free"
            price="$0"
            period="month"
            description="Perfect for getting started"
            features={[
              "3 roadmap generations per month",
              "3 resume analyses per month",
              "Basic AI chat assistance",
              "Standard support",
              // "7-day roadmap history",
            ]}
            buttonText={isAuthenticated ? "Current Plan" : "Get Started"}
            onButtonClick={
              isAuthenticated ? () => router.push("/dashboard") : handleLogin
            }
          />

          {/* Pro Plan */}
          <PricingCard
            title="Pro"
            price="$9.99"
            period="month"
            description="Unlock unlimited potential"
            features={[
              "Unlimited roadmap generations",
              "Unlimited resume analyses",
              "Advanced AI chat assistant",
              "Priority support",
              "Lifetime roadmap history",
              "Job matching recommendations",
              "Export roadmaps as PDF",
            ]}
            buttonText="Upgrade to Pro"
            isPopular={true}
            onButtonClick={handleUpgrade}
          />
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <p className="text-xs text-brand-accent-lt">
            Questions? Contact us at support@careerpilot.com
          </p>
        </div>
      </div>
      <ComingSoonModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        featureName="Payment and subscription system"
      />
    </div>
  );
}
