"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, BriefcaseBusiness, Bell, Menu } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/services/authService";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
      toast.success("Logged out successfully.");
      router.push("/login");
    },
    onError: () => {
      logout();
      router.push("/login");
    },
  });

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#7A9BC4]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 flex-shrink-0"
        >
          <div className="w-8 h-8 bg-[#000F22] rounded-lg flex items-center justify-center">
            <BriefcaseBusiness size={16} className="text-white" />
          </div>
          <span className="font-display italic text-[#000F22] text-xl leading-none hidden sm:block">
            CareerPilot
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Dashboard", href: "/dashboard" },
            { label: "AI Chat", href: "/chat" },
            { label: "Analysis", href: "/analysis" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-3.5 py-1.5 rounded-lg text-sm font-semibold text-[#537FAF] hover:text-[#000F22] hover:bg-[#000F22]/5 transition-all"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button
            aria-label="Notifications"
            className="relative w-9 h-9 flex items-center justify-center rounded-lg text-[#537FAF] hover:bg-[#000F22]/5 hover:text-[#000F22] transition-all"
          >
            <Bell size={18} />
            {/* Unread dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#557EB2] rounded-full" />
          </button>

          {/* Avatar */}
          {user && (
            <div className="w-8 h-8 rounded-full bg-[#000F22] border-2 border-[#7A9BC4]/30 flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-bold text-white">
                {initials}
              </span>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#537FAF] hover:text-[#000F22] px-3 py-1.5 rounded-lg hover:bg-[#000F22]/5 transition-all disabled:opacity-50"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#537FAF] hover:bg-[#000F22]/5"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#7A9BC4]/20 bg-white px-4 py-3 flex flex-col gap-1">
          {[
            { label: "Dashboard", href: "/dashboard" },
            { label: "AI Chat", href: "/chat" },
            { label: "Analysis", href: "/analysis" },
            { label: "Resume", href: "/resume" },
            { label: "Jobs", href: "/jobs" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#537FAF] hover:text-[#000F22] hover:bg-[#000F22]/5 transition-all"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => logoutMutation.mutate()}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 transition-all mt-1"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      )}
    </header>
  );
}
