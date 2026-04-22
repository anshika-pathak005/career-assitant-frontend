import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface PublicShellProps {
  children: ReactNode;
}

/**
 * PublicShell — layout wrapper for public-facing pages (landing, etc.)
 * Renders: Header → main content → Footer.
 */
export default function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="min-h-screen bg-[#C2E8FF] flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
