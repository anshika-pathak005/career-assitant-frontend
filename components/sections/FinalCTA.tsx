import Link from "next/link";
import { ArrowRight, Upload } from "lucide-react";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#042558] via-[#0d3a7a] to-[#1a5fa8] px-8 py-20 text-center shadow-2xl">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#557EB2]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-[#7AC4FF]/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 rounded-full bg-white/5 blur-2xl" />

        {/* Content */}
        <div className="relative z-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#7AC4FF] bg-white/10 px-4 py-1.5 rounded-full mb-6">
            Get started free
          </span>

          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">
            Ready to unlock your <br />
            <span className="text-[#7AC4FF]">career growth?</span>
          </h2>

          <p className="text-blue-200/80 text-base max-w-lg mx-auto mb-10 leading-relaxed">
            Stop guessing. Start building a clear, AI-powered career path today.
            No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                rightIcon={<ArrowRight size={16} />}
                className="bg-white text-[#042558] hover:bg-blue-50 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Start Free Analysis
              </Button>
            </Link>
            <Link href="/upload">
              <Button
                size="lg"
                variant="ghost"
                rightIcon={<Upload size={16} />}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Upload Resume
              </Button>
            </Link>
          </div>

          {/* Trust note */}
          <p className="mt-8 text-blue-300/60 text-xs">
            Trusted by 10,000+ students and job seekers · Free forever plan
            available
          </p>
        </div>
      </div>
    </section>
  );
}
