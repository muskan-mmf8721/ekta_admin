import { AlertTriangle } from "lucide-react";
import { Machine } from "@/lib/machines-data";
import { cn } from "@/lib/utils";

export function RemainingHoursAlert({ machine }: { machine: Machine }) {
  const pct = machine.utilization;
  const remaining = machine.hoursAllowed - machine.hoursUsed;
  const barColor =
    pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-orange-400" : "bg-green-500";

  const alertLevel =
    pct >= 90
      ? { label: "Critical: Approaching SOS", bg: "bg-red-50", text: "text-red-600", icon: "text-red-500" }
      : pct >= 70
      ? { label: "Warning: Approaching limit", bg: "bg-orange-50", text: "text-orange-600", icon: "text-orange-400" }
      : { label: "Normal operation", bg: "bg-green-50", text: "text-green-700", icon: "text-green-500" };

  const thresholds = [
    { label: "Warning at 70%",  value: Math.round(machine.hoursAllowed * 0.7) },
    { label: "Critical at 90%", value: Math.round(machine.hoursAllowed * 0.9) },
    { label: "SOS at 100%",     value: machine.hoursAllowed },
  ];

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">Remaining Hours Alert</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Threshold monitoring</p>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Total Limit</span>
          <span className="font-semibold text-foreground">{pct}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all", barColor)}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Alert box */}
      <div className={cn("flex items-start gap-2.5 rounded-lg px-3 py-2.5", alertLevel.bg)}>
        <AlertTriangle className={cn("w-4 h-4 mt-0.5 shrink-0", alertLevel.icon)} />
        <div>
          <p className={cn("text-sm font-semibold", alertLevel.text)}>
            {remaining}h remaining
          </p>
          <p className={cn("text-xs mt-0.5", alertLevel.text)}>{alertLevel.label}</p>
        </div>
      </div>

      {/* Threshold table */}
      <div className="flex flex-col gap-2.5 mt-1">
        {thresholds.map((t) => (
          <div key={t.label} className="flex justify-between text-xs">
            <span className="text-muted-foreground">{t.label}</span>
            <span className="font-medium text-foreground">{t.value}h</span>
          </div>
        ))}
      </div>
    </div>
  );
}
