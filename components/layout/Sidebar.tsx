// components/layout/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  Sparkles,
  MapIcon,
  TrendingUp,
  HelpCircle,
  Target,
  ChevronRight,
  BriefcaseBusiness,
  User,
  CreditCard,
  Menu,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";

const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Overview & insights",
      },
      {
        label: "Career Roadmap",
        href: "/roadmap",
        icon: MapIcon,
        description: "Your personalized path",
      },
      {
        label: "Resume Analysis",
        href: "/resume-analysis",
        icon: FileText,
        description: "Get your resume scored",
      },
    ],
  },
  {
    label: "Career Tools",
    items: [
      {
        label: "AI Chat Assistant",
        href: "/chat",
        icon: MessageSquare,
        description: "Ask career questions",
      },
      {
        label: "Job Matching",
        href: "/jobs",
        icon: BriefcaseBusiness,
        description: "Find your dream job",
      },
      {
        label: "Skill Assessment",
        href: "/skills",
        icon: Target,
        description: "Evaluate your strengths",
      },
      {
        label: "Progress Tracker",
        href: "/progress",
        icon: TrendingUp,
        description: "Monitor your growth",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Profile",
        href: "/profile",
        icon: User,
        description: "Manage your information",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        description: "Account preferences",
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        label: "Help Center",
        href: "/help",
        icon: HelpCircle,
        description: "Guides & tutorials",
      },
      {
        label: "Pricing",
        href: "/pricing",
        icon: CreditCard,
        description: "Upgrade your plan",
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on window resize (if screen becomes desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {NAV_SECTIONS.map((section, sectionIdx) => (
        <div
          key={section.label}
          className={`mb-6 ${sectionIdx === 0 ? "" : "mt-2"}`}
        >
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-brand-accent-lt">
            {section.label}
          </p>
          <div className="flex flex-col gap-1">
            {section.items.map(({ label, href, icon: Icon, description }) => {
              const isActive =
                pathname === href || pathname?.startsWith(href + "/");

              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    group relative flex items-center justify-between px-3 py-2.5 rounded-lg 
                    transition-all duration-200 ease-out
                    ${
                      isActive
                        ? "bg-brand-primary text-white shadow-md"
                        : "text-brand-muted hover:text-brand-primary hover:bg-brand-bg/50"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={17}
                      className={`
                        transition-all duration-200 group-hover:scale-110
                        ${
                          isActive
                            ? "text-white"
                            : "text-brand-accent-lt group-hover:text-brand-accent"
                        }
                      `}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{label}</span>
                      <span
                        className={`text-[10px] transition-colors duration-200 ${
                          isActive
                            ? "text-white/60"
                            : "text-brand-accent-lt group-hover:text-brand-muted"
                        }`}
                      >
                        {description}
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <ChevronRight size={14} className="text-white/60" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      {/* Upgrade nudge */}
      <div className="mt-auto relative mx-1 rounded-xl bg-gradient-to-br from-brand-bg to-brand-bg/40 border border-brand-accent-lt/30 p-4 overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="text-xs font-bold text-brand-primary">
              Unlock Full Potential
            </span>
          </div>
          <p className="text-[11px] text-brand-muted mb-3 leading-relaxed">
            Get unlimited roadmaps, detailed analysis, and priority support.
          </p>
          <Link href="/pricing">
            <button className="w-full bg-brand-primary text-white text-xs font-semibold py-2 rounded-lg hover:bg-brand-secondary hover:scale-[1.02] transition-all duration-200">
              Upgrade to Pro
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-20 right-4 z-50 md:hidden w-10 h-10 rounded-lg bg-brand-primary text-white flex items-center justify-center shadow-lg"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-primary/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl transition-transform duration-300 ease-in-out transform
          md:hidden
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-end p-4 border-b border-brand-accent-lt/20">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-8 h-8 rounded-lg bg-brand-bg flex items-center justify-center text-brand-accent hover:bg-brand-accent hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-68px)]">
          {sidebarContent}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-brand-accent-lt/20 shadow-card sticky top-6">
          <div className="p-3">{sidebarContent}</div>
        </div>
      </aside>
    </>
  );
}
