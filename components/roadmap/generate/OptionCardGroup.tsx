// components/roadmap/generate/OptionCardGroup.tsx

"use client";

import type { ComponentType, ReactNode } from "react";
import ErrorText from "@/components/ui/ErrorText";

/** Structural type so any lucide-react icon can be passed without version coupling. */
type IconComponent = ComponentType<{ size?: number; className?: string }>;

export interface OptionItem {
  value: string | number;
  label: string;
  /** Secondary line. `sub` wins over `desc` when both are present. */
  sub?: string;
  desc?: string;
  icon?: IconComponent;
}

interface OptionCardGroupProps {
  /** Field label rendered above the group. Pass `null` to render none. */
  label?: ReactNode;
  options: readonly OptionItem[];
  value: string | number | undefined;
  onChange: (value: never) => void;

  /** `card` = icon + title + subtitle tile. `pill` = compact label-only button. */
  variant?: "card" | "pill";
  /** Card variant only. `center` also hides the icon. */
  align?: "left" | "center";
  /** Layout classes for the wrapping grid/flex container. */
  containerClassName?: string;
  /** Extra sizing classes applied to each option button. */
  optionClassName?: string;

  error?: string;
  errorFieldName?: string;
  /** Optional badge rendered on the right of the label row. */
  labelAccessory?: ReactNode;
}

/**
 * OptionCardGroup -a single-select group of buttons.
 *
 * The roadmap form had five near-identical hand-rolled versions of this
 * (experience, career goal, project level, learning style, weekly hours),
 * plus two more for industries and skill levels. They all shared the same
 * selected/unselected treatment and differed only in layout and density,
 * so those differences are props here rather than duplicated markup.
 */
export default function OptionCardGroup({
  label,
  options,
  value,
  onChange,
  variant = "card",
  align = "left",
  containerClassName = "grid grid-cols-1 sm:grid-cols-2 gap-3",
  optionClassName = "",
  error,
  errorFieldName,
  labelAccessory,
}: OptionCardGroupProps) {
  const isCard = variant === "card";
  const showIcon = isCard && align === "left";

  return (
    <div>
      {(label || labelAccessory) && (
        <div className="flex items-center justify-between mb-2">
          {label && <label className="field-label">{label}</label>}
          {labelAccessory}
        </div>
      )}

      <div className={containerClassName}>
        {options.map((option) => {
          const selected = value === option.value;
          const Icon = option.icon;
          const secondary = option.sub ?? option.desc;

          const base = isCard
            ? [
                "p-3 rounded-lg border transition-all duration-150",
                align === "left"
                  ? "flex items-start gap-3 text-left"
                  : "text-center",
              ].join(" ")
            : "border font-medium transition-all duration-150";

          const state = selected
            ? isCard
              ? "bg-brand-primary border-brand-primary"
              : "bg-brand-primary border-brand-primary text-white"
            : "bg-white border-brand-accent-lt/30 hover:border-brand-accent" +
              (isCard ? "" : " text-brand-muted");

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value as never)}
              className={`${base} ${state} ${optionClassName}`}
            >
              {showIcon && Icon && (
                <Icon
                  size={18}
                  className={selected ? "text-white" : "text-brand-accent"}
                />
              )}

              {isCard ? (
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      selected ? "text-white" : "text-brand-primary"
                    }`}
                  >
                    {option.label}
                  </p>
                  {secondary && (
                    <p
                      className={`text-xs ${
                        selected ? "text-white/70" : "text-brand-muted"
                      }`}
                    >
                      {secondary}
                    </p>
                  )}
                </div>
              ) : (
                option.label
              )}
            </button>
          );
        })}
      </div>

      <ErrorText message={error} fieldName={errorFieldName} />
    </div>
  );
}
