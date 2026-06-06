// app/ClientLayoutWrapper.tsx

"use client";

import { Toaster } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouteGuard } from "@/hooks/useRouteGuard";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isChecking, isAuthorized } = useRouteGuard();

  // Show loading spinner while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#C2E8FF] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#557EB2] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Don't render for unauthorized users (they will be redirected)
  if (!isAuthorized) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}
