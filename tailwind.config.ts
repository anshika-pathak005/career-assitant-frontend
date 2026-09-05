import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
  ],
  theme: {
    // Extra-small breakpoint for very narrow phones (iPhone SE = 375px)
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        // display: ["DM Serif Display", "Georgia", "serif"],
        display: ["Roboto", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },

      /**
       * FLUID TYPE SCALE
       * Each step resolves to a clamp() defined in app/globals.css, so a bare
       * `text-2xl` already scales with the viewport. That means you should
       * NOT write `text-xl sm:text-2xl lg:text-3xl` any more - one class is
       * enough, and it keeps sizes consistent across every page.
       *
       * Line-height and tracking are baked into each step so headings never
       * end up with body line-height (or vice-versa) by accident.
       */
      fontSize: {
        "3xs":  ["var(--fs-3xs)",  { lineHeight: "1.4",  letterSpacing: "0.02em"   }],
        "2xs":  ["var(--fs-2xs)",  { lineHeight: "1.4",  letterSpacing: "0.01em"   }],
        xs:     ["var(--fs-xs)",   { lineHeight: "1.5",  letterSpacing: "0"        }],
        sm:     ["var(--fs-sm)",   { lineHeight: "1.55", letterSpacing: "0"        }],
        base:   ["var(--fs-base)", { lineHeight: "1.6",  letterSpacing: "0"        }],
        md:     ["var(--fs-md)",   { lineHeight: "1.55", letterSpacing: "-0.005em" }],
        lg:     ["var(--fs-lg)",   { lineHeight: "1.45", letterSpacing: "-0.01em"  }],
        xl:     ["var(--fs-xl)",   { lineHeight: "1.35", letterSpacing: "-0.01em"  }],
        "2xl":  ["var(--fs-2xl)",  { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        "3xl":  ["var(--fs-3xl)",  { lineHeight: "1.2",  letterSpacing: "-0.02em"  }],
        "4xl":  ["var(--fs-4xl)",  { lineHeight: "1.15", letterSpacing: "-0.02em"  }],
        "5xl":  ["var(--fs-5xl)",  { lineHeight: "1.1",  letterSpacing: "-0.025em" }],
        "6xl":  ["var(--fs-6xl)",  { lineHeight: "1.05", letterSpacing: "-0.03em"  }],
        "7xl":  ["var(--fs-7xl)",  { lineHeight: "1.02", letterSpacing: "-0.03em"  }],
      },

      // Fluid spacing steps - `p-fluid-md`, `gap-fluid-sm`, `mb-fluid-lg`, ...
      spacing: {
        "fluid-2xs": "var(--space-2xs)",
        "fluid-xs":  "var(--space-xs)",
        "fluid-sm":  "var(--space-sm)",
        "fluid-md":  "var(--space-md)",
        "fluid-lg":  "var(--space-lg)",
        "fluid-xl":  "var(--space-xl)",
        "fluid-2xl": "var(--space-2xl)",
        gutter:      "var(--page-gutter)",
        tap:         "var(--tap-target)",
      },

      minHeight: {
        tap: "var(--tap-target)",
      },
      minWidth: {
        tap: "var(--tap-target)",
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
          // Semantic - mirrors the --color-error/success/warning vars in globals.css
          success: "#16A34A",
          warning: "#D97706",
          error: "#DC2626",
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
 * Content:
 * - Specifies which folders/files Tailwind should scan for class names
 *
 * Theme extension:
 * - screens: adds an `xs` (420px) breakpoint for narrow phones
 * - fontFamily: custom fonts (font-display = Roboto, font-body = Plus Jakarta Sans)
 * - fontSize: FLUID scale wired to the --fs-* clamp() vars in app/globals.css.
 *   One class scales across all devices, so avoid `text-lg sm:text-xl lg:text-2xl`.
 * - spacing: fluid `*-fluid-{2xs..2xl}` steps plus `gutter` and `tap` helpers
 * - colors: custom brand palette
 * - borderRadius / boxShadow: card corners and UI depth
 * - keyframes & animation: fade-up / fade-in entrances
 *
 * Overall:
 * - Typography and spacing live in globals.css as CSS variables; this file
 *   only exposes them to Tailwind so both systems stay in sync.
 */
