"use client";

import { useState } from "react";
import {
  auditEntries,
  AuditAction,
  AUDIT_MODULES,
  AUDIT_ACTIONS,
} from "@/lib/audit-log-data";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, ChevronDown } from "lucide-react";

// ── Action badge colours ──────────────────────────────────────────────────────
const actionStyle: Record<AuditAction, string> = {
  "Created User":      "bg-blue-100   text-blue-700   border border-blue-200",
  "Data Entry":        "bg-sky-100    text-sky-700    border border-sky-200",
  "Alert Triggered":   "bg-orange-100 text-orange-600 border border-orange-200",
  "Breakdown Report":  "bg-red-100    text-red-600    border border-red-200",
  "Config Change":     "bg-purple-100 text-purple-700 border border-purple-200",
  Login:               "bg-green-100  text-green-700  border border-green-200",
  Export:              "bg-teal-100   text-teal-700   border border-teal-200",
};

// ── Avatar colour by initial ──────────────────────────────────────────────────
const avatarPalette: Record<string, string> = {
  A: "bg-blue-600",
  R: "bg-blue-500",
  S: "bg-indigo-500",
  P: "bg-pink-500",
  D: "bg-teal-500",
  V: "bg-violet-500",
  M: "bg-cyan-600",
};
function avatarBg(initial: string) {
  return avatarPalette[initial] ?? "bg-blue-600";
}

const SELECT_CLASS =
  "h-8 appearance-none pl-3 pr-7 rounded-lg border border-input bg-transparent text-sm text-foreground outline-none focus-visible:border-ring cursor-pointer";

export function AuditLogTable() {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All Modules");
  const [actionFilter, setActionFilter] = useState("All Actions");

  const filtered = auditEntries.filter((e) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      e.user.toLowerCase().includes(q) ||
      e.action.toLowerCase().includes(q) ||
      e.module.toLowerCase().includes(q) ||
      e.detail.toLowerCase().includes(q);
    const matchModule =
      moduleFilter === "All Modules" || e.module === moduleFilter;
    const matchAction =
      actionFilter === "All Actions" || e.action === actionFilter;
    return matchSearch && matchModule && matchAction;
  });

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      {/* ── Toolbar ── */}
      <div className="px-5 py-3.5 flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by user, action, module..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-sm max-w-xs"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Module filter */}
          <div className="relative">
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className={SELECT_CLASS}
            >
              <option>All Modules</option>
              {AUDIT_MODULES.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>

          {/* Action filter */}
          <div className="relative">
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className={SELECT_CLASS}
            >
              <option>All Actions</option>
              {AUDIT_ACTIONS.map((a) => (
                <option key={a}>{a}</option>
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
            <tr className="border-y border-border bg-muted/20">
              {["Timestamp", "User", "Action", "Module", "Detail", "IP"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-semibold text-foreground whitespace-nowrap"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-sm text-muted-foreground"
                >
                  No log entries match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  {/* Timestamp */}
                  <td className="px-5 py-3.5 text-xs text-muted-foreground whitespace-nowrap">
                    {entry.timestamp}
                  </td>

                  {/* User */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold",
                          avatarBg(entry.userInitial)
                        )}
                      >
                        {entry.userInitial}
                      </div>
                      <span className="text-sm font-medium text-foreground whitespace-nowrap">
                        {entry.user}
                      </span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap",
                        actionStyle[entry.action]
                      )}
                    >
                      {entry.action}
                    </span>
                  </td>

                  {/* Module */}
                  <td className="px-5 py-3.5 text-sm text-foreground whitespace-nowrap">
                    {entry.module}
                  </td>

                  {/* Detail */}
                  <td className="px-5 py-3.5 text-sm text-muted-foreground max-w-xs">
                    {entry.detail}
                  </td>

                  {/* IP */}
                  <td className="px-5 py-3.5 text-xs text-muted-foreground whitespace-nowrap font-mono">
                    {entry.ip ?? "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Footer ── */}
      <div className="px-5 py-3 border-t border-border text-xs text-muted-foreground">
        Showing {filtered.length} of {auditEntries.length} entries
      </div>
    </div>
  );
}
