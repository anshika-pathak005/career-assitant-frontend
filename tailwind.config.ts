import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["DM Serif Display", "Georgia", "serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        brand: {
          bg: "#C2E8FF",
          surface: "#FFFFFF",
          primary: "#000F22",
          secondary: "#042558",
          accent: "#557EB2",
          "accent-lt": "#7A9BC4",
          muted: "#537FAF",
        },
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,15,34,0.06), 0 4px 16px rgba(0,15,34,0.08)",
        lg: "0 4px 6px rgba(0,15,34,0.04), 0 12px 32px rgba(0,15,34,0.12)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 0.4s ease both",
      },
    },
  },
  plugins: [],
};

export default config;

/**
 * Tailwind CSS configuration file:
 * - Defines the design system and styling rules for the entire project
 * - Tailwind scans the specified files to generate only the used CSS classes
 *
 * Note:
 * - Tailwind comes with its own default design system
 * - Here we override and extend it to match our custom UI design (fonts, colors, animations, etc.)
 *   Example: instead of default font, we use "Plus Jakarta Sans"
 *
 * Content:
 * - Specifies which folders/files Tailwind should scan for class names
 *
 * Theme extension:
 * - fontFamily: Adds custom fonts (e.g. font-display, font-body)
 *   Example: font-body → Plus Jakarta Sans
 * - colors: Defines custom brand color palette for consistent UI styling
 *   Example: text-brand-primary → #000F22
 * - borderRadius: Custom rounded corners (sm, md, lg)
 * - boxShadow: Custom shadows for cards and UI depth
 *   Example: shadow-card for soft UI cards
 * - keyframes & animation: Defines custom animations
 *   Example: animate-fade-up, animate-fade-in
 *
 * Overall:
 * - This file customizes Tailwind default design system to match the application's branding and UI requirements
 */