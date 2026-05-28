import { AlertStatsCards } from "./components/AlertStatsCards";
import { AlertsTable } from "./components/AlertsTable";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AlertManagementPage() {
  return (
    <div className="flex flex-col gap-5 pb-10">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Alert Management
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Monitor, acknowledge, and resolve operational alerts
          </p>
        </div>
        <Button variant="outline" className="gap-2 h-9 px-4 shrink-0">
          <Bell className="w-4 h-4" />
          Configure Thresholds
        </Button>
      </div>

      {/* ── Stats Cards ── */}
      <AlertStatsCards />

      {/* ── Alerts Table ── */}
      <AlertsTable />
    </div>
  );
}
