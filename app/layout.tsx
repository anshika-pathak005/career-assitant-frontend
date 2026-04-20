import type { Metadata } from "next";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";

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
      <body className="font-body bg-[#C2E8FF] text-[#000F22] antialiased">
        {/* Order matters: QueryProvider wraps everything, AuthProvider sits inside */}
        <QueryProvider>
          <AuthProvider>
            {children}
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
