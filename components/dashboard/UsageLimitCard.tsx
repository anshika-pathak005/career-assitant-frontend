// components/dashboard/UsageLimitCard.tsx

"use client";

import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface UsageLimit {
  used: number;
  total: number;
  remaining: number;
  limitReached: boolean;
  resetsOn: string;
}

interface Props {
  label: string;
  icon: LucideIcon;
  limit: UsageLimit;
}

/**
 * One monthly quota card (roadmap or resume).
 * The two cards on the dashboard only differed by label and icon,
 * so both now render from this component.
 */
export default function UsageLimitCard({ label, icon: Icon, limit }: Props) {
  const router = useRouter();

  // Guard against total === 0 so the bar never gets width: NaN%
  const percentUsed = limit.total > 0 ? (limit.used / limit.total) * 100 : 0;

  return (
    <Card variant="flat" padding="sm" className="border border-brand-accent-lt/20">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-brand-bg flex items-center justify-center">
            <Icon size={12} className="text-brand-accent" />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-secondary">{label}</p>
            <p className="text-[10px] text-brand-muted">
              {limit.used} / {limit.total} used
            </p>
          </div>
        </div>
        {limit.limitReached && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/pricing")}
          >
            Upgrade
          </Button>
        )}
      </div>
      <div className="mt-1.5 h-1 bg-brand-bg rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-accent rounded-full"
          style={{ width: `${percentUsed}%` }}
        />
      </div>
    </Card>
  );
}
