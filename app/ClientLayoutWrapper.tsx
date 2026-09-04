// app/ClientLayoutWrapper.tsx

"use client";

import { Toaster } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouteGuard } from "@/hooks/useRouteGuard";
import FullPageSpinner from "@/components/ui/FullPageSpinner";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isChecking, isAuthorized } = useRouteGuard();

  // Show loading spinner while checking authentication
  if (isChecking) {
    return <FullPageSpinner />;
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
