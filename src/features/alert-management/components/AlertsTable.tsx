"use client";

import { useState } from "react";
import { alerts as initialAlerts, Alert, AlertSeverity, AlertStatus } from "@/lib/alerts-data";
import { cn } from "@/lib/utils";
import { AlertTriangle, Eye, CheckCircle, ChevronDown } from "lucide-react";

// ── Severity badge ────────────────────────────────────────────────────────────
const severityBadge: Record<AlertSeverity, string> = {
  Critical: "bg-red-100 text-red-600 border border-red-200",
  Warning: "bg-orange-100 text-orange-500 border border-orange-200",
};

// ── Severity icon colour ──────────────────────────────────────────────────────
const severityIcon: Record<AlertSeverity, string> = {
  Critical: "text-red-500",
  Warning: "text-orange-400",
};

// ── Status badge ──────────────────────────────────────────────────────────────
const statusStyle: Record<AlertStatus, string> = {
  Active: "bg-red-50 text-red-600 border border-red-200",
  Acknowledged: "bg-orange-50 text-orange-500 border border-orange-200",
  Resolved: "bg-green-50 text-green-600 border border-green-200",
};

// ── Filter options ────────────────────────────────────────────────────────────
const SEVERITY_OPTIONS = ["All Severity", "Critical", "Warning"] as const;
const STATUS_OPTIONS = ["All Status", "Active", "Acknowledged", "Resolved"] as const;

export function AlertsTable() {
  const [data, setData] = useState<Alert[]>(initialAlerts);
  const [severityFilter, setSeverityFilter] = useState("All Severity");
  const [statusFilter, setStatusFilter] = useState("All Status");

  function acknowledge(id: string) {
    setData((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Acknowledged" as AlertStatus } : a))
    );
  }

  function resolve(id: string) {
    setData((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Resolved" as AlertStatus } : a))
    );
  }

  const filtered = data.filter((a) => {
    const matchSev =
      severityFilter === "All Severity" || a.severity === severityFilter;
    const matchStat =
      statusFilter === "All Status" || a.status === statusFilter;
    return matchSev && matchStat;
  });

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      {/* ── Toolbar ── */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-4">
        <h3 className="text-sm font-bold text-foreground">All Alerts</h3>

        <div className="flex items-center gap-2">
          {/* Severity filter */}
          <div className="relative">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="h-8 appearance-none pl-3 pr-7 rounded-lg border border-input bg-transparent text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
            >
              {SEVERITY_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-8 appearance-none pl-3 pr-7 rounded-lg border border-input bg-transparent text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Type", "Source", "Severity", "Message", "Time", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-12 text-center text-sm text-muted-foreground"
                >
                  No alerts match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((alert) => (
                <tr
                  key={alert.id}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  {/* Type */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={cn(
                          "w-4 h-4 shrink-0",
                          severityIcon[alert.severity]
                        )}
                      />
                      <span className="text-sm font-medium text-foreground whitespace-nowrap">
                        {alert.type}
                      </span>
                    </div>
                  </td>

                  {/* Source */}
                  <td className="px-5 py-4 text-sm text-foreground whitespace-nowrap font-medium">
                    {alert.source}
                  </td>

                  {/* Severity */}
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                        severityBadge[alert.severity]
                      )}
                    >
                      {alert.severity}
                    </span>
                  </td>

                  {/* Message */}
                  <td className="px-5 py-4 text-sm text-muted-foreground max-w-xs">
                    {alert.message}
                  </td>

                  {/* Time */}
                  <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">
                    {alert.time}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                        statusStyle[alert.status]
                      )}
                    >
                      {alert.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    {alert.status === "Active" && (
                      <div className="flex items-center gap-2">
                        <button className="w-7 h-7 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors">
                          <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => acknowledge(alert.id)}
                          className="h-7 px-3 rounded-md border border-border bg-white hover:bg-muted text-xs font-semibold text-foreground transition-colors"
                        >
                          Ack
                        </button>
                      </div>
                    )}

                    {alert.status === "Acknowledged" && (
                      <div className="flex items-center gap-2">
                        <button className="w-7 h-7 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors">
                          <CheckCircle className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => resolve(alert.id)}
                          className="h-7 px-3 rounded-md border border-border bg-white hover:bg-muted text-xs font-semibold text-foreground transition-colors"
                        >
                          Resolve
                        </button>
                      </div>
                    )}

                    {alert.status === "Resolved" && (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
