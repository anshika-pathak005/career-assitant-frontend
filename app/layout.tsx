// app/layout.tsx

import type { Metadata } from "next";
import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
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
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Roboto = font-display, Plus Jakarta Sans = font-body (see tailwind.config.ts) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-brand-bg text-brand-primary antialiased flex flex-col min-h-screen">
        <QueryProvider>
          <AuthProvider>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
