// components/layout/Sidebar.tsx (ENHANCED VERSION)

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

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
        label: "My Roadmaps",
        href: "/roadmap",
        icon: MapIcon,
        description: "Your personalized path",
      },
      {
        label: "My Resume Analysis",
        href: "/resume-analysis",
        icon: FileText,
        description: "ATS score & feedback",
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
    label: "Support",
    items: [
      {
        label: "Help Center",
        href: "/help",
        icon: HelpCircle,
        description: "Guides & tutorials",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        description: "Account preferences",
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white/80 backdrop-blur-sm border-r border-[#7A9BC4]/20 min-h-[calc(100vh-64px)] py-6 px-3 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#C2E8FF]/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#557EB2]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {NAV_SECTIONS.map((section, sectionIdx) => (
          <div
            key={section.label}
            className={`mb-6 ${sectionIdx === 0 ? "" : "mt-2"}`}
          >
            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#7A9BC4]">
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
                          ? "bg-[#000F22] text-white shadow-md"
                          : "text-[#537FAF] hover:text-[#000F22] hover:bg-[#C2E8FF]/50"
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
                              : "text-[#7A9BC4] group-hover:text-[#557EB2]"
                          }
                        `}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{label}</span>
                        <span
                          className={`text-[10px] transition-colors duration-200 ${
                            isActive
                              ? "text-white/60"
                              : "text-[#7A9BC4] group-hover:text-[#537FAF]"
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

        {/* Spacer */}
        <div className="flex-1" />

        {/* Upgrade nudge - enhanced */}
        <div className="relative mx-1 rounded-xl bg-gradient-to-br from-[#C2E8FF] to-[#C2E8FF]/40 border border-[#7A9BC4]/30 p-4 overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-[#000F22] flex items-center justify-center">
                <Sparkles size={12} className="text-white" />
              </div>
              <span className="text-xs font-bold text-[#000F22]">
                Unlock Full Potential
              </span>
            </div>
            <p className="text-[11px] text-[#537FAF] mb-3 leading-relaxed">
              Get unlimited roadmap generations, detailed analysis, and priority
              support.
            </p>
            <button className="w-full bg-[#000F22] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#042558] hover:scale-[1.02] transition-all duration-200">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
