// components/settings/SettingCard.tsx

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Card from "@/components/ui/Card";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
  danger?: boolean;
}

/** Titled card wrapper used by each settings section. */
export default function SettingCard({
  icon: Icon,
  title,
  description,
  children,
  danger = false,
}: Props) {
  return (
    <Card
      variant="default"
      padding="lg"
      className={danger ? "border-red-200" : "mb-6"}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            danger ? "bg-red-100" : "bg-brand-bg"
          }`}
        >
          <Icon
            size={16}
            className={danger ? "text-red-500" : "text-brand-accent"}
          />
        </div>
        <div>
          <h2
            className={`font-semibold ${danger ? "text-red-600" : "text-brand-primary"}`}
          >
            {title}
          </h2>
          <p className="text-xs text-brand-muted">{description}</p>
        </div>
      </div>
      {children}
    </Card>
  );
}
