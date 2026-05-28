import { Clock, AlertTriangle, Fuel } from "lucide-react";
import { DGSet } from "@/lib/dg-data";
import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  subClass?: string;
}

export function DGStatCards({ dg }: { dg: DGSet }) {
  const stats: Stat[] = [
    {
      label: "Hours Used",
      value: dg.hoursUsed,
      sub: `of ${dg.hoursAllowed}`,
      icon: Clock,
    },
    {
      label: "Utilization",
      value: `${dg.utilization}%`,
      sub: dg.utilizationLabel,
      icon: AlertTriangle,
      subClass:
        dg.utilizationLabel === "Warning" || dg.utilizationLabel === "Critical"
          ? "text-orange-500"
          : "text-muted-foreground",
    },
    {
      label: "Fuel Rate",
      value: dg.fuelRate,
      sub: "Avg consumption",
      icon: Fuel,
    },
    {
      label: "Downtime",
      value: dg.downtime,
      sub: "This month",
      icon: Clock,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-border shadow-sm px-5 py-4 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">
                {s.label}
              </span>
              <Icon className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-foreground leading-none">
              {s.value}
            </p>
            <p className={cn("text-xs", s.subClass ?? "text-muted-foreground")}>
              {s.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
}
