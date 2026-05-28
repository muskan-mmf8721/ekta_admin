import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  status: "success" | "warning" | "critical" | "destructive";
}

export function MetricCard({ title, value, trend, status }: MetricCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className=" flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</span>
          <div className={cn("w-2 h-2 rounded-full", {
            "bg-success": status === "success",
            "bg-warning": status === "warning",
            "bg-critical": status === "critical",
            "bg-destructive": status === "destructive",
          })} />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{value}</span>
          <span className={cn("text-[11px] font-medium mt-1", {
            "text-success": status === "success",
            "text-warning": status === "warning",
            "text-critical": status === "critical",
            "text-destructive": status === "destructive",
          })}>{trend}</span>
        </div>
      </CardContent>
    </Card>
  );
}
