import type { Metadata } from "next";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "CareerPilot — Your AI Career Growth Partner",
  description:
    "AI-powered career guidance, resume analysis, skill gap detection and job matching.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-[#C2E8FF] text-[#000F22] antialiased flex flex-col min-h-screen">
        <QueryProvider>
          <AuthProvider>
            {/*
              Header is smart — it hides itself on auth pages (/login, /register)
              and switches between public nav and app nav based on auth state.
            */}
            <Header />

            {/* Page content grows to fill available space */}
            <div className="flex-1 flex flex-col">{children}</div>

            <Footer />

            {/* Global toast notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: "14px",
                },
              }}
            />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
