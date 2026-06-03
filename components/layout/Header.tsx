"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  BriefcaseBusiness,
  Bell,
  LogOut,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Target,
  Menu,
  X,
  ChevronDown,
  Bot,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/services/authService";

/* ─── Authenticated nav links ────────────────────────────────────── */
const APP_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Roadmap", href: "/roadmap", icon: MessageSquare },
  { label: "Resume", href: "/resume-analysis", icon: FileText },
  { label: "Jobs", href: "/jobs", icon: Target },
  { label: "AIChat", href: "/chat", icon: Bot },
];

/* ─── Public nav links ───────────────────────────────────────────── */
const PUBLIC_NAV = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

/* ─── Brand logo ─────────────────────────────────────────────────── */
function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
      <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center transition-transform group-hover:scale-105">
        <BriefcaseBusiness size={20} className="text-[#000F22]" />
      </div>
      <span className="font-display font-bold text-white text-2xl leading-none">
        CareerPilot
      </span>
    </Link>
  );
}

/* ─── Main Header ────────────────────────────────────────────────── */
export default function Header() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSettled: () => {
      // Always clear client state regardless of server response
      logout();
      toast.success("Logged out successfully.");
      // Little delay while redirection
      setTimeout(() => {
        router.push("/login");
      }, 100);
    },
  });

  // Don't render header on auth pages (login / register)
  const isAuthPage = ["/login", "/register", "/register/step2"].includes(
    pathname,
  );
  if (isAuthPage) return null;

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#000F22]/95 backdrop-blur-md border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          {/* ── Brand ─────────────────────────────────────────── */}
          <Brand />

          {/* ── Center nav ────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {isAuthenticated
              ? APP_NAV.map(({ label, href, icon: Icon }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={[
                        "flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-semibold transition-all duration-150",
                        active
                          ? "bg-white text-[#000F22]"
                          : "text-white/70 hover:text-white hover:bg-white/10",
                      ].join(" ")}
                    >
                      <Icon size={14} />
                      {label}
                    </Link>
                  );
                })
              : PUBLIC_NAV.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="px-3.5 py-2 rounded-md text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-all"
                  >
                    {label}
                  </Link>
                ))}
          </nav>

          {/* ── Right actions ─────────────────────────────────── */}
          <div className="flex items-center gap-2 ml-auto">
            {isLoading ? (
              /* Skeleton while auth hydrates */
              <div className="w-24 h-8 bg-white/20 rounded-md animate-pulse" />
            ) : isAuthenticated ? (
              /* ── Authenticated right side ─────────────────── */
              <>
                {/* Notification bell */}
                <button
                  aria-label="Notifications"
                  className="relative w-7 h-7 flex items-center justify-center rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Bell size={19} />
                  {/* Unread dot */}
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
                </button>

                {/* User avatar + dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                  >
                    {/* Avatar circle */}
                    <div className="w-7 h-7 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">
                        {user?.name?.charAt(0).toUpperCase() ?? "?"}
                      </span>
                    </div>
                    <span className="hidden sm:block text-m font-semibold text-white/90 max-w-[100px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown
                      size={13}
                      className={`text-white/60 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-lg border border-[#7A9BC4]/20 shadow-lg z-20 overflow-hidden animate-fade-up">
                        {/* User info */}
                        <div className="px-4 py-3 border-b border-[#7A9BC4]/15">
                          <p className="text-m font-bold text-[#000F22] truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-[#537FAF] truncate mt-0.5">
                            {user?.email}
                          </p>
                        </div>
                        {/* Menu items */}
                        <div className="py-1">
                          <Link
                            href="/settings"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#042558] hover:bg-[#C2E8FF]/50 transition-colors"
                          >
                            Settings
                          </Link>
                          <Link
                            href="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#042558] hover:bg-[#C2E8FF]/50 transition-colors"
                          >
                            Dashboard
                          </Link>
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              logoutMutation.mutate();
                            }}
                            disabled={logoutMutation.isPending}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          >
                            <LogOut size={14} />
                            {logoutMutation.isPending
                              ? "Logging out…"
                              : "Log out"}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              /* ── Public right side ────────────────────────── */
              <>
                <Link href="/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm" className="text-white">
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get started</Button>
                </Link>
              </>
            )}

            {/* Mobile menu toggle */}
            {/* <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors ml-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button> */}
          </div>
        </div>

        {/* ── Mobile menu ──────────────────────────────────────── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#000F22]/98 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {(isAuthenticated ? APP_NAV : PUBLIC_NAV).map((item) => {
                const href = item.href;
                const label = item.label;
                const Icon = "icon" in item ? item.icon : null;
                const active = pathname === href;

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors",
                      active
                        ? "bg-white text-[#000F22]"
                        : "text-white/70 hover:text-white hover:bg-white/10",
                    ].join(" ")}
                  >
                    {/* {Icon && <Icon size={15} />} */}
                    {label}
                  </Link>
                );
              })}

              {/* Mobile auth actions */}
              {!isAuthenticated && (
                <div className="flex gap-2 pt-2 border-t border-white/10 mt-1">
                  <Link
                    href="/login"
                    className="flex-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Button variant="ghost" size="sm" className="w-full">
                      Sign in
                    </Button>
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Button size="sm" className="w-full">
                      Get started
                    </Button>
                  </Link>
                </div>
              )}

              {isAuthenticated && (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    logoutMutation.mutate();
                  }}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-semibold text-red-400 hover:bg-white/10 transition-colors mt-1 border-t border-white/10 pt-3"
                >
                  <LogOut size={15} />
                  Log out
                </button>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
