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
    <main className="min-h-screen bg-brand-bg relative overflow-x-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/25 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-[#7AC4FF]/20 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="animate-fade-up inline-flex items-center gap-2 bg-white/70 border border-brand-accent-lt/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
          <Sparkles size={13} className="text-brand-accent" />
          <span className="text-xs font-semibold text-brand-secondary">
            Our Story
          </span>
        </div>

        <h1 className="animate-fade-up delay-1 text-6xl mb-fluid-md">
          We believe everyone deserves a{" "}
          <span className="text-brand-accent">clear career path</span>
        </h1>

        <p className="animate-fade-up delay-2 text-brand-muted text-lg max-w-2xl mx-auto leading-relaxed">
          CareerPilot was born from a simple idea: career growth shouldn't be
          confusing. We use AI to help job seekers navigate their professional
          journey with clarity and confidence.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full mb-4">
              Our Mission
            </span>
            <h2 className="text-4xl mb-4">
              Empower every job seeker with{" "}
              <span className="text-brand-accent">AI-driven guidance</span>
            </h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              We're on a mission to democratize career guidance. No more
              guessing what to learn next, no more wasting time on irrelevant
              skills, no more uncertainty about job readiness.
            </p>
            <p className="text-brand-muted leading-relaxed">
              Whether you're a student, fresher, or experienced professional
              looking to switch careers, CareerPilot gives you a clear,
              actionable roadmap to your dream job.
            </p>
          </div>
          <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl p-8 text-center shadow-xl">
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
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full mb-4">
            Our Values
          </span>
          <h2 className="text-3xl">
            What drives us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-brand-accent-lt/15 shadow-card hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-lg bg-brand-bg flex items-center justify-center mb-3">
              <Users size={18} className="text-brand-accent" />
            </div>
            <h3 className="card-heading mb-2">User First</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Everything we build starts with the question: "Does this help our
              users grow?"
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-brand-accent-lt/15 shadow-card hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-lg bg-brand-bg flex items-center justify-center mb-3">
              <Rocket size={18} className="text-brand-accent" />
            </div>
            <h3 className="card-heading mb-2">Innovation</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              We leverage cutting-edge AI to provide insights that were never
              possible before.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-brand-accent-lt/15 shadow-card hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-lg bg-brand-bg flex items-center justify-center mb-3">
              <Heart size={18} className="text-brand-accent" />
            </div>
            <h3 className="card-heading mb-2">Empathy</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              We understand the challenges of job hunting and design solutions
              that truly help.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section (Coming Soon) */}
      {/* <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-br from-brand-bg/50 to-white rounded-2xl p-10 border border-brand-accent-lt/20">
          <div className="w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center mx-auto mb-4">
            <Users size={24} className="text-white" />
          </div>
          <h3 className="subsection-title mb-2">
            Join our team
          </h3>
          <p className="text-sm text-brand-muted max-w-md mx-auto mb-4">
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
          className="bg-gradient-to-br from-brand-primary to-brand-secondary border-none"
        >
          <h2 className="hero-title mb-3">
            Ready to start your journey?
          </h2>
          <p className="text-brand-accent-lt text-sm mb-6 max-w-md mx-auto">
            Join thousands of job seekers who are building their dream careers
            with AI-powered guidance.
          </p>
          <Link href="/register">
            <Button
              variant="primary"
              size="lg"
            //   className="bg-white text-brand-primary hover:bg-brand-bg"
            >
              Start for free
            </Button>
          </Link>
        </Card>
      </section>
    </main>
  );
}
