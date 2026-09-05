// components/ui/PasswordInput.tsx

"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "./Input";

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

/**
 * Password field with a built-in show/hide toggle.
 * Owning the toggle here means the parent no longer needs a `showX` useState
 * for every password field on the page.
 */
export default function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  required,
}: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        label={label}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        error={error}
        rightIcon={
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="tap-target text-brand-muted hover:text-brand-secondary transition-colors"
          >
            {visible ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        }
      />
    </div>
  );
}
