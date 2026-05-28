"use client";

import { useState } from "react";
import { scheduledReports, ScheduledReport } from "@/lib/reports-data";
import { EditScheduleModal } from "./EditScheduleModal";

export function ScheduledReports() {
  const [editReport, setEditReport] = useState<ScheduledReport | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-sm font-bold text-foreground">
            Scheduled Reports
          </h3>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border">
          {scheduledReports.map((report) => (
            <div
              key={report.id}
              className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-muted/20 transition-colors"
            >
              {/* Info */}
              <div>
                <p className="text-sm font-semibold text-blue-600 leading-tight">
                  {report.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {report.schedule}{" "}
                  <span className="mx-1">→</span>
                  {report.recipients}
                </p>
              </div>

              {/* Edit button */}
              <button
                onClick={() => setEditReport(report)}
                className="h-7 px-3 rounded-lg border border-border bg-white hover:bg-muted text-xs font-semibold text-foreground transition-colors shrink-0"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      <EditScheduleModal
        report={editReport}
        onClose={() => setEditReport(null)}
      />
    </>
  );
}
