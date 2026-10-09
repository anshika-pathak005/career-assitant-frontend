import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/**
 * Input -consistent form input with label, optional icons, and error state.
 * Uses forwardRef so React Hook Form can attach its ref.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, hint, leftIcon, rightIcon, id, className = "", ...rest },
    ref,
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className="field-label">
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-brand-muted pointer-events-none flex items-center">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              "w-full h-10 sm:h-11 rounded-md font-body text-base text-brand-primary",
              "bg-white border transition-all duration-150 outline-none",
              "placeholder:text-brand-accent-lt",
              leftIcon ? "pl-9 sm:pl-10" : "pl-3 sm:pl-3.5",
              rightIcon ? "pr-9 sm:pr-10" : "pr-3 sm:pr-3.5",
              error
                ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200"
                : "border-brand-accent-lt/60 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
              className,
            ].join(" ")}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...rest}
          />

          {rightIcon && (
            <span className="absolute right-3 text-brand-muted flex items-center">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-500 font-body">
            {error}
          </p>
        )}

        {/* Hint */}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="field-hint">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
