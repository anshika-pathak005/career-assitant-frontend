import Link from "next/link";
// import { BriefcaseBusiness, Github, Twitter, Linkedin } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";

/* ─── Footer link groups ─────────────────────────────────────────── */
const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { label: "Roadmap Generation", href: "/roadmap" },
      { label: "Resume Analysis", href: "/resume-analysis" },
      { label: "Pricing", href: "/pricing" },
      // { label: "Changelog", href: "/changelog" },
      { label: "AI Assistance", href: "/chat" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/#" },
      { label: "Career Tips", href: "/#" },
      { label: "Documentation", href: "/#" },
      { label: "Support", href: "/help" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy", href: "/#" },
      { label: "Terms", href: "/#" },
      { label: "Help & Support", href: "/help" },
    ],
  },
];

const SOCIAL = [
  { icon: BriefcaseBusiness, href: "https://github.com", label: "GitHub" },
  { icon: BriefcaseBusiness, href: "https://twitter.com", label: "Twitter" },
  { icon: BriefcaseBusiness, href: "https://linkedin.com", label: "LinkedIn" },
];

/* ─── Component ──────────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Top row — brand + links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center transition-colors group-hover:bg-white/20">
                <BriefcaseBusiness size={15} className="text-white" />
              </div>
              <span className="font-display text-white text-xl leading-none">
                CareerPilot
              </span>
            </Link>
            <p className="text-sm text-brand-muted leading-relaxed max-w-[220px]">
              AI-powered career guidance to help you land your dream job faster.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-md bg-white/6 text-brand-muted hover:bg-white/12 hover:text-white transition-all"
                >
                  <Icon size={14} />
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
              <ul className="flex flex-col gap-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-brand-muted hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row — copyright + badge */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-muted">
            © {year} CareerPilot. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 bg-white/6 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-brand-accent-lt font-medium">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
