// app/about/page.tsx

"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Rocket,
  Heart,
  Shield,
  Award,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#C2E8FF] relative overflow-x-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/25 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-[#7AC4FF]/20 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="animate-fade-up inline-flex items-center gap-2 bg-white/70 border border-[#7A9BC4]/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
          <Sparkles size={13} className="text-[#557EB2]" />
          <span className="text-xs font-semibold text-[#042558]">
            Our Story
          </span>
        </div>

        <h1 className="animate-fade-up delay-1 font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6 text-[#000F22]">
          We believe everyone deserves a{" "}
          <span className="text-[#557EB2]">clear career path</span>
        </h1>

        <p className="animate-fade-up delay-2 text-[#537FAF] text-lg max-w-2xl mx-auto leading-relaxed">
          CareerPilot was born from a simple idea: career growth shouldn't be
          confusing. We use AI to help job seekers navigate their professional
          journey with clarity and confidence.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#557EB2] bg-[#557EB2]/10 px-3 py-1 rounded-full mb-4">
              Our Mission
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#000F22] mb-4">
              Empower every job seeker with{" "}
              <span className="text-[#557EB2]">AI-driven guidance</span>
            </h2>
            <p className="text-[#537FAF] leading-relaxed mb-4">
              We're on a mission to democratize career guidance. No more
              guessing what to learn next, no more wasting time on irrelevant
              skills, no more uncertainty about job readiness.
            </p>
            <p className="text-[#537FAF] leading-relaxed">
              Whether you're a student, fresher, or experienced professional
              looking to switch careers, CareerPilot gives you a clear,
              actionable roadmap to your dream job.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#000F22] to-[#042558] rounded-2xl p-8 text-center shadow-xl">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Target size={28} className="text-white" />
            </div>
            <p className="text-white text-lg font-display mb-2">10,000+</p>
            <p className="text-blue-200 text-sm">
              Job seekers already on their path
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#557EB2] bg-[#557EB2]/10 px-3 py-1 rounded-full mb-4">
            Our Values
          </span>
          <h2 className="font-display text-3xl text-[#000F22]">
            What drives us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-[#7A9BC4]/15 shadow-card hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#C2E8FF] flex items-center justify-center mb-3">
              <Users size={18} className="text-[#557EB2]" />
            </div>
            <h3 className="font-semibold text-[#000F22] mb-2">User First</h3>
            <p className="text-xs text-[#537FAF] leading-relaxed">
              Everything we build starts with the question: "Does this help our
              users grow?"
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#7A9BC4]/15 shadow-card hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#C2E8FF] flex items-center justify-center mb-3">
              <Rocket size={18} className="text-[#557EB2]" />
            </div>
            <h3 className="font-semibold text-[#000F22] mb-2">Innovation</h3>
            <p className="text-xs text-[#537FAF] leading-relaxed">
              We leverage cutting-edge AI to provide insights that were never
              possible before.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#7A9BC4]/15 shadow-card hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#C2E8FF] flex items-center justify-center mb-3">
              <Heart size={18} className="text-[#557EB2]" />
            </div>
            <h3 className="font-semibold text-[#000F22] mb-2">Empathy</h3>
            <p className="text-xs text-[#537FAF] leading-relaxed">
              We understand the challenges of job hunting and design solutions
              that truly help.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section (Coming Soon) */}
      {/* <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-br from-[#C2E8FF]/50 to-white rounded-2xl p-10 border border-[#7A9BC4]/20">
          <div className="w-14 h-14 rounded-full bg-[#000F22] flex items-center justify-center mx-auto mb-4">
            <Users size={24} className="text-white" />
          </div>
          <h3 className="font-display text-xl text-[#000F22] mb-2">
            Join our team
          </h3>
          <p className="text-sm text-[#537FAF] max-w-md mx-auto mb-4">
            We're always looking for passionate people to help us build the
            future of career guidance.
          </p>
          <Link href="/contact">
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight size={12} />}
            >
              View Openings
            </Button>
          </Link>
        </div>
      </section> */}

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <Card
          variant="default"
          padding="lg"
          className="bg-gradient-to-br from-[#000F22] to-[#042558] border-none"
        >
          <h2 className="font-display text-white text-2xl sm:text-3xl mb-3">
            Ready to start your journey?
          </h2>
          <p className="text-[#7A9BC4] text-sm mb-6 max-w-md mx-auto">
            Join thousands of job seekers who are building their dream careers
            with AI-powered guidance.
          </p>
          <Link href="/register">
            <Button
              variant="primary"
              size="lg"
            //   className="bg-white text-[#000F22] hover:bg-[#C2E8FF]"
            >
              Start for free
            </Button>
          </Link>
        </Card>
      </section>
    </main>
  );
}
