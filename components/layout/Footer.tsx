import Link from "next/link";
import { BriefcaseBusiness, Globe, Share2, Sparkles } from "lucide-react";

/* ─── Footer link groups ─────────────────────────────────────────── */
const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { label: "Career Roadmap", href: "/roadmap" },
      { label: "Resume Analysis", href: "/resume-analysis" },
      { label: "Job Matching", href: "/jobs" },
      { label: "AI Career Coach", href: "/chat" },
      { label: "Pricing Plans", href: "/pricing" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Skill Assessment", href: "/skills" },
      { label: "Progress Tracker", href: "/progress" },
      { label: "Help & Support", href: "/help" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Privacy Policy", href: "/#" },
      { label: "Terms of Service", href: "/#" },
    ],
  },
];

const SOCIAL = [
  { icon: Globe, href: "https://github.com", label: "GitHub" },
  { icon: Share2, href: "https://twitter.com", label: "Twitter" },
  { icon: BriefcaseBusiness, href: "https://linkedin.com", label: "LinkedIn" },
];

/* ─── Component ──────────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-primary text-white mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Top row -brand + links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <BriefcaseBusiness size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-white text-2xl leading-none">
                CareerPilot
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              AI-powered career guidance, roadmap generation, and resume
              analysis to accelerate your professional growth.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 mt-1">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-150"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-accent-lt">
                {heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row -copyright + operational badge */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60">
            © {year} CareerPilot. All rights reserved.
          </p>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shrink-0" />
            <span className="text-xs text-emerald-300 font-semibold tracking-wide">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
