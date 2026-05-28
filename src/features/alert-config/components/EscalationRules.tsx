import { escalationRules } from "@/lib/alert-config-data";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const levelStyle: Record<number, string> = {
  1: "bg-orange-400 text-white",
  2: "bg-orange-500 text-white",
  3: "bg-red-500 text-white",
};

export function EscalationRules() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-sm font-bold text-foreground">Escalation Rules</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Auto-escalate unacknowledged alerts
        </p>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {escalationRules.map((rule) => (
          <div
            key={rule.level}
            className="px-6 py-4 flex items-center gap-4 hover:bg-muted/20 transition-colors"
          >
            {/* Level badge */}
            <span
              className={cn(
                "shrink-0 px-3 py-1 rounded-full text-xs font-bold",
                levelStyle[rule.level]
              )}
            >
              Level {rule.level}
            </span>

            {/* Description */}
            <p className="flex-1 text-sm text-foreground">
              After{" "}
              <span className="font-bold">{rule.delay}</span> escalate to{" "}
              <span className="font-bold">{rule.target}</span>
            </p>

            {/* Email icon */}
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors shrink-0">
              <Mail className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
