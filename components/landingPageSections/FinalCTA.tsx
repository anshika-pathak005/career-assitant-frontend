// components/sections/FinalCTA.tsx

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary to-brand-secondary px-8 py-20 text-center shadow-2xl">
        <div className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full bg-brand-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-[#7AC4FF]/15 blur-3xl" />

        <div className="relative z-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#7AC4FF] bg-white/10 px-4 py-1.5 rounded-full mb-6">
            Get started free
          </span>

          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">
            Ready to accelerate your{" "}
            <span className="text-[#7AC4FF]">career journey?</span>
          </h2>

          <p className="text-blue-200/80 text-base max-w-lg mx-auto mb-10 leading-relaxed">
            Join thousands of job seekers who are building their dream careers
            with AI-powered guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="primary"
                rightIcon={<ArrowRight size={16} />}
              >
               Get Started for Free
              </Button>
            </Link>
            {/* <Link href="/resume-analysis">
              <Button
                size="lg"
                variant="ghost"
                rightIcon={<Sparkles size={16} />}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Explore Features
              </Button>
            </Link> */}
          </div>

          <p className="mt-8 text-blue-300/60 text-xs">
            Free plan available • No credit card required • Upgrade anytime
          </p>
        </div>
      </div>
    </section>
  );
}