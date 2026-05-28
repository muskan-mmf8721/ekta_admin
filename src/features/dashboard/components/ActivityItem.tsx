import { cn } from "@/lib/utils";
import { Check, AlertTriangle, XCircle } from "lucide-react";

export function ActivityItem({ user, action, time, type }: any) {
  return (
    <div className="flex gap-3">
      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5", {
        "bg-success/10 text-success": type === "success",
        "bg-warning/10 text-warning": type === "warning",
        "bg-destructive/10 text-destructive": type === "destructive",
      })}>
        {type === "success" && <Check className="w-3 h-3" strokeWidth={3} />}
        {type === "warning" && <AlertTriangle className="w-3 h-3" strokeWidth={3} />}
        {type === "destructive" && <XCircle className="w-3 h-3" strokeWidth={3} />}
      </div>
      <div className="flex flex-col">
        <p className="text-[13px]">
          <span className="font-semibold">{user}</span> {action}
        </p>
        <span className="text-[11px] text-muted-foreground mt-0.5">{time}</span>
      </div>
    </div>
  );
}
