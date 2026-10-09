import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

interface AppShellProps {
  children: ReactNode;
  /** Set false to hide the sidebar (e.g. full-width pages) */
  showSidebar?: boolean;
}

/**
 * AppShell -layout wrapper for all authenticated app pages.
 * Renders: Header → (Sidebar + main content) → Footer.
 */
export default function AppShell({
  children,
  showSidebar = true,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Header />

      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 gap-6 py-6">
        {showSidebar && <Sidebar />}
        <main className="flex-1 min-w-0 flex flex-col gap-6">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
