"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, BriefcaseBusiness, Bell } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/services/authService";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
      toast.success("Logged out successfully.");
      router.push("/login");
    },
    onError: () => {
      // Force logout on client even if API fails
      logout();
      router.push("/login");
    },
  });

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#7A9BC4]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 flex-shrink-0"
        >
          <div className="w-8 h-8 bg-[#000F22] rounded-md flex items-center justify-center">
            <BriefcaseBusiness size={16} className="text-white" />
          </div>
          <span className="font-display italic text-[#000F22] text-xl leading-none hidden sm:block">
            CareerAI
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Dashboard", href: "/dashboard" },
            { label: "AI Chat", href: "/chat" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-3.5 py-1.5 rounded-md text-sm font-semibold text-[#537FAF] hover:text-[#000F22] hover:bg-[#000F22]/5 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Notifications"
            className="w-9 h-9 flex items-center justify-center rounded-md text-[#537FAF] hover:bg-[#000F22]/5 transition-colors"
          >
            <Bell size={18} />
          </button>

          {/* User avatar */}
          {user && (
            <div className="w-8 h-8 rounded-full bg-[#C2E8FF] border border-[#7A9BC4]/40 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-[#042558]">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            leftIcon={<LogOut size={14} />}
            isLoading={logoutMutation.isPending}
            onClick={() => logoutMutation.mutate()}
          >
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
