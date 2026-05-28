import { User, Clock, Wrench } from "lucide-react";
import { MaintenanceLog } from "@/lib/machines-data";
import { cn } from "@/lib/utils";

type LogType = MaintenanceLog["type"];

const dotColor: Record<LogType, string> = {
  "Breakdown":   "bg-red-500",
  "Daily Maint.":"bg-green-500",
  "Preventive":  "bg-blue-500",
};

const labelColor: Record<LogType, string> = {
  "Breakdown":   "text-red-600",
  "Daily Maint.":"text-green-700",
  "Preventive":  "text-blue-600",
};

export function MaintenanceLogs({ logs }: { logs: MaintenanceLog[] }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h3 className="text-sm font-bold text-foreground">Maintenance Log Timeline</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Chronological maintenance &amp; breakdown events
          </p>
        </div>
        <Wrench className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Timeline */}
      <div className="divide-y divide-border/50">
        {logs.map((log, i) => (
          <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-muted/20 transition-colors">
            {/* Dot */}
            <span
              className={cn(
                "mt-1 w-3 h-3 rounded-full shrink-0",
                dotColor[log.type]
              )}
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={cn("text-sm font-bold", labelColor[log.type])}>
                {log.type}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {log.description}
              </p>
              <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {log.technician}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {log.duration}
                </span>
              </div>
            </div>

            {/* Date */}
            <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
              {log.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
