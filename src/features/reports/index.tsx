import { ReportCards } from "./components/ReportCards";
import { ScheduledReports } from "./components/ScheduledReports";
import { CustomReportModal } from "./components/CustomReportModal";

export function ReportsPage() {
  return (
    <div className="flex flex-col gap-5 pb-10">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Reports &amp; Export
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Generate, schedule, and export operational reports
          </p>
        </div>
        <CustomReportModal />
      </div>

      {/* ── Report Cards Grid ── */}
      <ReportCards />

      {/* ── Scheduled Reports ── */}
      <ScheduledReports />
    </div>
  );
}
