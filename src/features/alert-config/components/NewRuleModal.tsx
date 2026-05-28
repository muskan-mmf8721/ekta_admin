"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export function NewRuleModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    alertType: "",
    parameter: "",
    warning: "70%",
    critical: "90%",
    sos: "100%",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // API integration will go here
    setOpen(false);
    setForm({ alertType: "", parameter: "", warning: "70%", critical: "90%", sos: "100%" });
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2 h-9 px-4">
        <Plus className="w-4 h-4" />
        New Rule
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="sm:max-w-md p-0 gap-0 overflow-hidden"
        >
          <DialogHeader className="px-6 py-5 border-b border-border">
            <DialogTitle className="text-base font-bold">
              New Threshold Rule
            </DialogTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Define warning, critical and SOS limits for a monitored parameter.
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-5 flex flex-col gap-4">
              {/* Alert Type + Parameter */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="alertType" className="text-xs font-semibold">
                    Alert Type
                  </Label>
                  <Input
                    id="alertType"
                    name="alertType"
                    placeholder="e.g. Machine Hours"
                    value={form.alertType}
                    onChange={handleChange}
                    required
                    className="h-9"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="parameter" className="text-xs font-semibold">
                    Parameter
                  </Label>
                  <Input
                    id="parameter"
                    name="parameter"
                    placeholder="e.g. Breakdown hrs"
                    value={form.parameter}
                    onChange={handleChange}
                    required
                    className="h-9"
                  />
                </div>
              </div>

              {/* Warning + Critical + SOS */}
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="warning" className="text-xs font-semibold">
                    Warning
                  </Label>
                  <Input
                    id="warning"
                    name="warning"
                    placeholder="70%"
                    value={form.warning}
                    onChange={handleChange}
                    className="h-9"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="critical" className="text-xs font-semibold">
                    Critical
                  </Label>
                  <Input
                    id="critical"
                    name="critical"
                    placeholder="90%"
                    value={form.critical}
                    onChange={handleChange}
                    className="h-9"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="sos" className="text-xs font-semibold">
                    SOS
                  </Label>
                  <Input
                    id="sos"
                    name="sos"
                    placeholder="100%"
                    value={form.sos}
                    onChange={handleChange}
                    className="h-9"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="h-9 px-5"
              >
                Cancel
              </Button>
              <Button type="submit" className="h-9 px-5">
                Create Rule
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
