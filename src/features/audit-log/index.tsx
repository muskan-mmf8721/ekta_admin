import { AuditLogTable } from "./components/AuditLogTable";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function AuditLogPage() {
  return (
    <div className="flex flex-col gap-5 pb-10">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Complete activity trail — all actions are logged and immutable
          </p>
        </div>
        <Button variant="outline" className="gap-2 h-9 px-4 shrink-0">
          <Download className="w-4 h-4" />
          Export Log
        </Button>
      </div>

      {/* ── Table ── */}
      <AuditLogTable />
    </div>
  );
}
