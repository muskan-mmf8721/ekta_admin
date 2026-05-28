"use client";

import { useState } from "react";
import { thresholdRules, ThresholdRule } from "@/lib/alert-config-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ── Inline edit modal ─────────────────────────────────────────────────────────
function EditRuleModal({
  rule,
  onClose,
}: {
  rule: ThresholdRule | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    warning: rule?.warning ?? "",
    critical: rule?.critical ?? "",
    sos: rule?.sos ?? "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // API integration will go here
    onClose();
  }

  if (!rule) return null;

  return (
    <Dialog open={!!rule} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent
        showCloseButton
        className="sm:max-w-sm p-0 gap-0 overflow-hidden"
      >
        <DialogHeader className="px-6 py-5 border-b border-border">
          <DialogTitle className="text-base font-bold">
            Edit Threshold Rule
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            <span className="font-semibold text-foreground">{rule.alertType}</span>
            {" — "}
            {rule.parameter}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 grid grid-cols-3 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="e-warning" className="text-xs font-semibold text-orange-500">
                Warning
              </Label>
              <Input
                id="e-warning"
                name="warning"
                value={form.warning}
                onChange={handleChange}
                className="h-9"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="e-critical" className="text-xs font-semibold text-red-500">
                Critical
              </Label>
              <Input
                id="e-critical"
                name="critical"
                value={form.critical}
                onChange={handleChange}
                className="h-9"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="e-sos" className="text-xs font-semibold text-red-700">
                SOS
              </Label>
              <Input
                id="e-sos"
                name="sos"
                value={form.sos}
                onChange={handleChange}
                className="h-9"
              />
            </div>
          </div>

          <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="h-8 px-4">
              Cancel
            </Button>
            <Button type="submit" className="h-8 px-4">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Main table ────────────────────────────────────────────────────────────────
export function ThresholdRulesTable() {
  const [editRule, setEditRule] = useState<ThresholdRule | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-sm font-bold text-foreground">Threshold Rules</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Admin-configurable thresholds for all monitored parameters
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                  Alert Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                  Parameter
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-orange-500">
                  Warning
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-red-500">
                  Critical
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-red-700">
                  SOS
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {thresholdRules.map((rule) => (
                <tr
                  key={rule.id}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  {/* Alert Type */}
                  <td className="px-6 py-4 font-semibold text-foreground whitespace-nowrap">
                    {rule.alertType}
                  </td>

                  {/* Parameter */}
                  <td className="px-6 py-4 text-muted-foreground">
                    {rule.parameter}
                  </td>

                  {/* Warning – plain orange text */}
                  <td className="px-6 py-4">
                    {rule.warning === "—" ? (
                      <span className="text-muted-foreground">—</span>
                    ) : (
                      <span className="text-orange-500 font-semibold text-xs">
                        {rule.warning}
                      </span>
                    )}
                  </td>

                  {/* Critical – plain red text */}
                  <td className="px-6 py-4">
                    <span className="text-red-500 font-semibold text-xs">
                      {rule.critical}
                    </span>
                  </td>

                  {/* SOS – red pill badge */}
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500 text-white">
                      {rule.sos}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setEditRule(rule)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditRuleModal rule={editRule} onClose={() => setEditRule(null)} />
    </>
  );
}
