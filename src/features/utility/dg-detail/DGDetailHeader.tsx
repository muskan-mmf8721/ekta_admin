import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import { DGSet, DGStatus } from "@/lib/dg-data";
import { cn } from "@/lib/utils";

const statusStyle: Record<DGStatus, string> = {
  Active:   "bg-green-500  text-white",
  Warning:  "bg-orange-400 text-white",
  Critical: "bg-red-500    text-white",
};

export function DGDetailHeader({ dg }: { dg: DGSet }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Back button */}
      <Link
        href="/utility"
        className="inline-flex items-center gap-2 text-sm font-medium text-foreground border border-border bg-white hover:bg-muted/50 px-4 py-2 rounded-lg w-fit transition-colors shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Utility
      </Link>

      {/* Identity card */}
      <div className="bg-white rounded-xl border border-border shadow-sm px-6 py-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-11 h-11 rounded-xl bg-orange-400 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>

          {/* Name + status */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
                {dg.id}
              </h1>
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                  statusStyle[dg.status]
                )}
              >
                {dg.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{dg.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
