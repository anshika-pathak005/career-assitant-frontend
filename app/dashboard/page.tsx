"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  FileText,
  Target,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

/* ─── Stat card data ─────────────────────────────────────────────── */
const stats = [
  { label: "Resume Score", value: "—", icon: FileText, color: "#557EB2" },
  { label: "Skill Gap Items", value: "—", icon: Target, color: "#042558" },
  { label: "Jobs Matched", value: "—", icon: TrendingUp, color: "#537FAF" },
  { label: "AI Chats", value: "0", icon: MessageSquare, color: "#7A9BC4" },
];

/* ─── Quick actions ──────────────────────────────────────────────── */
const quickActions = [
  {
    icon: FileText,
    title: "Analyze Resume",
    desc: "Upload your resume for instant AI feedback.",
    href: "/resume",
    cta: "Upload Resume",
  },
  {
    icon: MessageSquare,
    title: "AI Career Chat",
    desc: "Ask anything — interview tips, career paths, salary.",
    href: "/chat",
    cta: "Start Chatting",
  },
  {
    icon: Target,
    title: "Find Skill Gaps",
    desc: "See what skills you need for your dream role.",
    href: "/jobs",
    cta: "Explore Jobs",
  },
];

/* ─── Page ───────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/login");
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#C2E8FF] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#557EB2] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#C2E8FF] flex flex-col">
      {/* <Navbar /> */}

      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 gap-6 py-6">
        <Sidebar />

        <main className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Welcome banner */}
          <div className="animate-fade-up bg-[#000F22] rounded-lg px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-[#7A9BC4] text-xs font-semibold uppercase tracking-wider mb-1">
                Welcome back
              </p>
              <h1 className="font-display  text-white text-2xl sm:text-3xl">
                {user?.name ?? "there"}
              </h1>
              <p className="text-[#537FAF] text-sm mt-1">
                Your AI career assistant is ready.
              </p>
            </div>
            <div className="hidden sm:flex w-12 h-12 bg-white/10 rounded-full items-center justify-center flex-shrink-0">
              <Sparkles size={22} className="text-white" />
            </div>
          </div>

          {/* Stats row */}
          <div className="animate-fade-up delay-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <Card key={label} padding="sm" className="flex flex-col gap-3">
                <div
                  className="w-9 h-9 rounded-md flex items-center justify-center"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={17} style={{ color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#000F22]">{value}</p>
                  <p className="text-xs text-[#537FAF] font-medium">{label}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick actions */}
          <div className="animate-fade-up delay-2">
            <h2 className="text-sm font-bold text-[#042558] uppercase tracking-wider mb-3">
              Get Started
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickActions.map(({ icon: Icon, title, desc, href, cta }) => (
                <Card
                  key={title}
                  className="flex flex-col gap-4 hover:shadow-lg transition-shadow"
                >
                  <div className="w-10 h-10 bg-[#C2E8FF] rounded-md flex items-center justify-center">
                    <Icon size={18} className="text-[#557EB2]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#000F22] text-sm mb-1">
                      {title}
                    </h3>
                    <p className="text-xs text-[#537FAF] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                  <Link href={href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      rightIcon={<ArrowRight size={13} />}
                      className="w-full"
                    >
                      {cta}
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent activity placeholder */}
          <div className="animate-fade-up delay-3">
            <h2 className="text-sm font-bold text-[#042558] uppercase tracking-wider mb-3">
              Recent Activity
            </h2>
            <Card
              variant="flat"
              className="flex flex-col items-center justify-center py-12 gap-3"
            >
              <div className="w-12 h-12 bg-[#C2E8FF] rounded-full flex items-center justify-center">
                <Clock size={20} className="text-[#557EB2]" />
              </div>
              <p className="text-sm font-semibold text-[#042558]">
                No activity yet
              </p>
              <p className="text-xs text-[#537FAF] text-center max-w-xs">
                Start by uploading your resume or having a chat with your AI
                career coach.
              </p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
