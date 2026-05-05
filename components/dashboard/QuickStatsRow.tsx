import { LucideIcon } from "lucide-react";

interface Stat {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  trend?: string;
}

interface Props {
  stats: Stat[];
}

export default function QuickStatsRow({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, iconColor, iconBg, trend }) => (
        <div
          key={label}
          className="group bg-white rounded-xl border border-[#7A9BC4]/20 shadow-card p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
              style={{ background: iconBg }}
            >
              <Icon size={17} style={{ color: iconColor }} />
            </div>
            {trend && (
              <span className="text-[10px] font-bold text-[#16A34A] bg-green-50 px-1.5 py-0.5 rounded-full">
                {trend}
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-[#000F22] mb-0.5">{value}</p>
          <p className="text-xs font-medium text-[#537FAF]">{label}</p>
        </div>
      ))}
    </div>
  );
}
