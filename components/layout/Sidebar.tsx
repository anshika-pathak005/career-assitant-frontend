// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   MessageSquare,
//   FileText,
//   Target,
//   Settings,
//   Sparkles,
// } from "lucide-react";

// const navItems = [
//   { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//   { label: "AI Chat", href: "/chat", icon: MessageSquare },
//   { label: "Resume", href: "/resume", icon: FileText },
//   { label: "Jobs", href: "/jobs", icon: Target },
//   { label: "Settings", href: "/settings", icon: Settings },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="hidden md:flex flex-col w-56 shrink-0 bg-white border-r border-[#7A9BC4]/20 min-h-[calc(100vh-64px)] py-6 px-3 gap-1">
//       {/* Section label */}
//       <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#537FAF]">
//         Navigation
//       </p>

//       {navItems.map(({ label, href, icon: Icon }) => {
//         const isActive = pathname === href;
//         return (
//           <Link
//             key={href}
//             href={href}
//             className={[
//               "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-all duration-150",
//               isActive
//                 ? "bg-[#000F22] text-white"
//                 : "text-[#537FAF] hover:text-[#000F22] hover:bg-[#000F22]/5",
//             ].join(" ")}
//           >
//             <Icon size={17} />
//             {label}
//           </Link>
//         );
//       })}

//       {/* Upgrade nudge at bottom */}
//       <div className="mt-auto mx-1 rounded-lg bg-[#C2E8FF] border border-[#7A9BC4]/30 p-4">
//         <div className="flex items-center gap-2 mb-1.5">
//           <Sparkles size={14} className="text-[#557EB2]" />
//           <span className="text-xs font-bold text-[#000F22]">Pro Plan</span>
//         </div>
//         <p className="text-[11px] text-[#537FAF] mb-3 leading-relaxed">
//           Unlock resume AI, unlimited chat & job matching.
//         </p>
//         <button className="w-full bg-[#000F22] text-white text-xs font-bold py-2 rounded-md hover:bg-[#042558] transition-colors">
//           Upgrade
//         </button>
//       </div>
//     </aside>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Target,
  Settings,
  Sparkles,
  BarChart3,
  User,
} from "lucide-react";

const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "AI Chat", href: "/chat", icon: MessageSquare },
      { label: "Analysis", href: "/analysis", icon: BarChart3 },
    ],
  },
  {
    label: "Career Tools",
    items: [
      { label: "Resume", href: "/resume", icon: FileText },
      { label: "Job Match", href: "/jobs", icon: Target },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Profile", href: "/profile", icon: User },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 bg-white border-r border-[#7A9BC4]/20 min-h-[calc(100vh-64px)] py-5 px-2.5">
      {NAV_SECTIONS.map((section) => (
        <div key={section.label} className="mb-5">
          <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#7A9BC4]">
            {section.label}
          </p>
          <div className="flex flex-col gap-0.5">
            {section.items.map(({ label, href, icon: Icon }) => {
              // Mark active if exact match or sub-path
              const isActive =
                pathname === href ||
                (href !== "/dashboard" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 group",
                    isActive
                      ? "bg-[#000F22] text-white"
                      : "text-[#537FAF] hover:text-[#000F22] hover:bg-[#000F22]/5",
                  ].join(" ")}
                >
                  <Icon
                    size={16}
                    className={`transition-transform group-hover:scale-110 ${
                      isActive
                        ? "text-white"
                        : "text-[#7A9BC4] group-hover:text-[#557EB2]"
                    }`}
                  />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      {/* Upgrade nudge */}
      <div className="mt-auto mx-1 rounded-xl bg-gradient-to-br from-[#C2E8FF] to-[#C2E8FF]/50 border border-[#7A9BC4]/30 p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles size={13} className="text-[#557EB2]" />
          <span className="text-xs font-bold text-[#000F22]">
            Upgrade to Pro
          </span>
        </div>
        <p className="text-[11px] text-[#537FAF] mb-3 leading-relaxed">
          Unlimited AI analysis, resume builder & priority job matching.
        </p>
        <button className="w-full bg-[#000F22] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#042558] transition-colors">
          Upgrade Now
        </button>
      </div>
    </aside>
  );
}