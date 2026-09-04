// components/sections/RoadmapPreview.tsx

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Target,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function RoadmapPreview() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-4 py-1.5 rounded-full mb-4">
          Our Core Feature
        </span>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-brand-primary leading-tight">
          Your <span className="text-brand-accent">Personalized Roadmap</span> to
          Success
        </h2>
        <p className="mt-4 text-brand-muted text-base max-w-xl mx-auto leading-relaxed">
          Get a step-by-step learning plan tailored to your dream job.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left - Preview Card */}
        <Card
          variant="default"
          padding="lg"
          className="relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-brand-accent">
                  Full Stack Developer
                </p>
                <p className="font-semibold text-brand-primary text-lg">
                  Career Roadmap
                </p>
              </div>
              <Sparkles size={20} className="text-brand-accent" />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-brand-muted">Overall Progress</span>
                  <span className="font-semibold text-brand-accent">45%</span>
                </div>
                <div className="h-2 bg-brand-bg rounded-full overflow-hidden">
                  <div className="h-full bg-brand-accent rounded-full w-[45%]" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-success/20 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-brand-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-brand-primary">
                      Phase 1: Foundation
                    </p>
                    <p className="text-[10px] text-brand-muted">
                      8 weeks • 4 skills
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-brand-success">
                    25%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-bg flex items-center justify-center">
                    <span className="text-xs font-semibold text-brand-accent">
                      2
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-brand-primary">
                      Phase 2: Core Skills
                    </p>
                    <p className="text-[10px] text-brand-muted">
                      10 weeks • 5 skills
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-brand-accent-lt">
                    0%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-bg flex items-center justify-center">
                    <span className="text-xs font-semibold text-brand-accent">
                      3
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-brand-primary">
                      Phase 3: Advanced
                    </p>
                    <p className="text-[10px] text-brand-muted">
                      6 weeks • 3 skills
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-brand-accent-lt">
                    0%
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-brand-accent-lt/15">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-brand-muted">Total duration</span>
                  <span className="font-semibold text-brand-primary">24 weeks</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Right - Content */}
        <div>
          <h3 className="font-display text-2xl sm:text-3xl text-brand-primary mb-4">
            Why you need a{" "}
            <span className="text-brand-accent">career roadmap</span>
          </h3>
          <p className="text-brand-muted leading-relaxed mb-6">
            Without a structured plan, you might waste months learning the wrong
            things. Our AI creates a personalized roadmap that shows you
            exactly:
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <CheckCircle2
                size={16}
                className="text-brand-success shrink-0 mt-0.5"
              />
              <span className="text-sm text-brand-primary">
                What skills to learn first
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2
                size={16}
                className="text-brand-success shrink-0 mt-0.5"
              />
              <span className="text-sm text-brand-primary">
                How long each phase will take
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2
                size={16}
                className="text-brand-success shrink-0 mt-0.5"
              />
              <span className="text-sm text-brand-primary">
                Projects to build for your portfolio
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2
                size={16}
                className="text-brand-success shrink-0 mt-0.5"
              />
              <span className="text-sm text-brand-primary">
                Resources and learning materials
              </span>
            </li>
          </ul>
          <Link href="/login">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={16} />}
            >
              Generate Your Free Roadmap
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
