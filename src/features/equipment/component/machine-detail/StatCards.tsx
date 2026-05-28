import { Clock, Activity, TrendingUp, Fuel } from "lucide-react";
import { Machine } from "@/lib/machines-data";
import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  iconColor: string;
}

export function StatCards({ machine }: { machine: Machine }) {
  const stats: Stat[] = [
    {
      label: "Hours Used",
      value: `${machine.hoursUsed}h`,
      sub: `of ${machine.hoursAllowed}h`,
      icon: Clock,
      iconColor: "text-blue-500",
    },
    {
      label: "Total Moves",
      value: machine.moves.toLocaleString(),
      sub: "this month",
      icon: Activity,
      iconColor: "text-green-500",
    },
    {
      label: "Moves/Hr",
      value: machine.movesHr.toFixed(1),
      sub: `SLA: ${machine.slaTarget.toFixed(1)}`,
      icon: TrendingUp,
      iconColor: "text-green-500",
    },
    {
      label: "Fuel Used",
      value: `${machine.fuelUsedL.toLocaleString()} L`,
      sub: machine.fuelChange,
      icon: Fuel,
      iconColor: "text-orange-400",
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
              <Icon className={cn("w-4 h-4", s.iconColor)} />
            </div>
            <p className="text-2xl font-bold text-foreground leading-none">
              {s.value}
            </p>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
