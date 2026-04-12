import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[#000F22] text-white hover:bg-[#042558] active:bg-[#000F22] focus-visible:ring-2 focus-visible:ring-[#557EB2]/50",
  secondary:
    "bg-[#557EB2] text-white hover:bg-[#537FAF] active:bg-[#557EB2] focus-visible:ring-2 focus-visible:ring-[#557EB2]/40",
  ghost:
    "bg-transparent text-[#042558] border border-[#7A9BC4] hover:bg-[#000F22]/5 focus-visible:ring-2 focus-visible:ring-[#557EB2]/30",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-400/50",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8  px-3  text-xs  gap-1.5",
  md: "h-11 px-5  text-sm  gap-2",
  lg: "h-12 px-6  text-base gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={[
        "inline-flex items-center justify-center font-body font-semibold",
        "rounded-md transition-all duration-150 select-none outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
      disabled={isDisabled}
      {...rest}
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : leftIcon ? (
        <span className="flex-shrink-0">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
}
