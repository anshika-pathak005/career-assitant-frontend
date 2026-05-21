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

/* ─── Feature Item Component ────────────────────────────────────── */
function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Check size={14} className="text-[#16A34A] flex-shrink-0" />
      <span className="text-sm text-[#537FAF]">{text}</span>
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
      className={`relative rounded-2xl ${isPopular ? "scale-105 shadow-2xl" : "shadow-lg"}`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#557EB2] text-white text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <Card
        variant="default"
        padding="lg"
        className={`h-full ${isPopular ? "border-[#557EB2] border-2" : "border-[#7A9BC4]/20"}`}
      >
        <div className="text-center mb-6">
          <h3 className="font-display text-[#000F22] text-xl mb-1">{title}</h3>
          <p className="text-xs text-[#537FAF]">{description}</p>
        </div>

        <div className="text-center mb-6">
          <span className="font-display text-[#000F22] text-4xl font-bold">
            {price}
          </span>
          <span className="text-[#537FAF] text-sm">/{period}</span>
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

  const handleUpgrade = () => {
    // Redirect to payment/checkout page (to be implemented)
    console.log("Proceed to checkout");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#C2E8FF] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
            <Sparkles size={12} className="text-[#557EB2]" />
            <span className="text-[10px] font-medium text-[#557EB2] uppercase tracking-wider">
              Simple Pricing
            </span>
          </div>
          <h1 className="font-display text-[#000F22] text-3xl sm:text-4xl mb-3">
            Choose the plan that fits your journey
          </h1>
          <p className="text-sm text-[#537FAF] max-w-md mx-auto">
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
              "7-day roadmap history",
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

        {/* Feature Comparison Section */}
        <div className="mt-16">
          <h2 className="font-display text-[#000F22] text-2xl text-center mb-8">
            Everything you need to accelerate your career
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="w-10 h-10 rounded-full bg-[#C2E8FF] flex items-center justify-center mx-auto mb-2">
                <Target size={16} className="text-[#557EB2]" />
              </div>
              <p className="text-sm font-semibold text-[#000F22]">
                Smart Roadmaps
              </p>
              <p className="text-xs text-[#537FAF]">
                Personalized learning paths
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-10 h-10 rounded-full bg-[#C2E8FF] flex items-center justify-center mx-auto mb-2">
                <FileText size={16} className="text-[#557EB2]" />
              </div>
              <p className="text-sm font-semibold text-[#000F22]">
                Resume Analysis
              </p>
              <p className="text-xs text-[#537FAF]">
                ATS score & improvement tips
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-10 h-10 rounded-full bg-[#C2E8FF] flex items-center justify-center mx-auto mb-2">
                <MessageSquare size={16} className="text-[#557EB2]" />
              </div>
              <p className="text-sm font-semibold text-[#000F22]">
                AI Career Chat
              </p>
              <p className="text-xs text-[#537FAF]">24/7 career guidance</p>
            </div>
            <div className="text-center p-4">
              <div className="w-10 h-10 rounded-full bg-[#C2E8FF] flex items-center justify-center mx-auto mb-2">
                <BriefcaseBusiness size={16} className="text-[#557EB2]" />
              </div>
              <p className="text-sm font-semibold text-[#000F22]">
                Job Matching
              </p>
              <p className="text-xs text-[#537FAF]">Find your perfect role</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <p className="text-xs text-[#7A9BC4]">
            Questions? Contact us at support@careerpilot.com
          </p>
        </div>
      </div>
    </div>
  );
}
