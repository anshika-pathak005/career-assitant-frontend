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
        display: ["Instrument Serif", "Georgia", "serif"],
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
