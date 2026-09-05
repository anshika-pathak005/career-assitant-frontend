import { HTMLAttributes, ReactNode } from "react";

type CardVariant = "default" | "flat" | "outlined";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-white shadow-card border border-brand-accent-lt/15",
  flat: "bg-white/70 border border-brand-accent-lt/20",
  outlined: "bg-transparent border border-brand-accent-lt/40",
};

const paddingStyles = {
  none: "",
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-6",
  lg: "p-5 sm:p-8",
};

export default function Card({
  variant = "default",
  padding = "md",
  children,
  className = "",
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        "rounded-lg font-body",
        variantStyles[variant],
        paddingStyles[padding],
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
