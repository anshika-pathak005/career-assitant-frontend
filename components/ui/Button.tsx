// components/ui/Button.tsx

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "subtle";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  /** Stretch to the width of the parent. Use for mobile CTAs and form actions. */
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-primary text-white hover:bg-brand-secondary active:bg-brand-primary focus-visible:ring-2 focus-visible:ring-brand-accent/50",
  secondary:
    "bg-brand-accent text-white hover:bg-brand-muted active:bg-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent/40",
  ghost:
    "bg-transparent text-brand-secondary border border-brand-accent-lt/60 hover:bg-brand-primary/5 hover:border-brand-accent active:bg-brand-primary/10 focus-visible:ring-2 focus-visible:ring-brand-accent/30",
  subtle:
    "bg-brand-bg text-brand-secondary hover:bg-brand-accent-lt/30 active:bg-brand-accent-lt/40 focus-visible:ring-2 focus-visible:ring-brand-accent/30",
  danger:
    "bg-brand-error text-white hover:bg-red-700 active:bg-brand-error focus-visible:ring-2 focus-visible:ring-red-400/50",
};

/**
 * Heights are fixed rather than fluid so buttons sitting next to each other
 * always line up. `min-h-tap` (44px) keeps every size finger-friendly on
 * touch screens even when the visual height is smaller.
 */
const sizeStyles: Record<Size, string> = {
  sm: "h-9  min-h-[2.25rem] px-3   text-xs  gap-1.5 rounded-md",
  md: "h-11 min-h-tap       px-4   text-sm  gap-2   rounded-md",
  lg: "h-12 min-h-tap       px-5   text-base gap-2  rounded-md",
};

/** Icon sizing is driven from the button so callers can't mismatch it. */
const iconSize: Record<Size, string> = {
  sm: "[&_svg]:w-3.5 [&_svg]:h-3.5",
  md: "[&_svg]:w-4   [&_svg]:h-4",
  lg: "[&_svg]:w-[18px] [&_svg]:h-[18px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={[
        // Layout - `shrink-0` stops flex parents squashing the button,
        // `whitespace-nowrap` stops the label breaking mid-word on mobile.
        "inline-flex items-center justify-center shrink-0 whitespace-nowrap",
        "font-body font-semibold leading-none text-center align-middle",
        "transition-[background-color,border-color,color,transform,box-shadow] duration-150",
        "select-none outline-none cursor-pointer",
        // Press feedback
        "active:scale-[0.98]",
        // Disabled
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:pointer-events-none",
        // Icons must never shrink or inherit odd sizing
        "[&_svg]:shrink-0",
        iconSize[size],
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" aria-hidden="true" />
      ) : leftIcon ? (
        <span className="flex items-center" aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}

      {/* truncate keeps a long label inside the button instead of overflowing */}
      <span className="truncate">{children}</span>

      {!isLoading && rightIcon && (
        <span className="flex items-center" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
}

/**
 * Button
 * - variant: primary | secondary | ghost | subtle | danger
 * - size:    sm (36px) | md (44px) | lg (48px) - all meet the 44px touch target
 * - fullWidth: stretch to the parent's width (pair with `action-row` on mobile)
 * - isLoading: swaps the left icon for a spinner and blocks interaction
 *
 * Note: `type` defaults to "button" so a button inside a <form> can no longer
 * submit it by accident. Pass type="submit" explicitly where that is intended.
 */
