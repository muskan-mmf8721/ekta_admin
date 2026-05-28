import Link from "next/link";
import { ArrowLeft, User, Clock } from "lucide-react";
import { Machine, MachineStatus } from "@/lib/machines-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<MachineStatus, string> = {
  Active:    "bg-green-500  text-white",
  Warning:   "bg-orange-400 text-white",
  Critical:  "bg-red-500    text-white",
  Breakdown: "bg-red-600    text-white",
};

export function DetailHeader({ machine }: { machine: Machine }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Back button */}
      <Link
        href="/equipment"
        className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-lg w-fit transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Fleet
      </Link>

      {/* Machine info card */}
      <div className="bg-white rounded-xl border border-border shadow-sm px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          {/* Left — identity */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                {machine.id}
              </h1>
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                  statusStyles[machine.status]
                )}
              >
                {machine.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {machine.type} &bull; {machine.department}
            </p>
            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Operator: {machine.operator}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Last entry: {machine.lastEntry}
              </span>
            </div>
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="h-9 px-4 text-sm font-medium border border-border rounded-lg hover:bg-muted/50 transition-colors">
              Edit Machine
            </button>
            <button className="h-9 px-4 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Log Maintenance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
