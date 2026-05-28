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
import { FileText, Download } from "lucide-react";
import { DATA_SOURCES, REPORT_FORMATS } from "@/lib/reports-data";

const SELECT_CLASS =
  "h-9 w-full appearance-none rounded-lg border border-input bg-transparent pl-3 pr-8 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 transition-colors cursor-pointer";

export function CustomReportModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    dataSource: DATA_SOURCES[0],
    format: REPORT_FORMATS[0],
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // API integration will go here
    setOpen(false);
    setForm({ name: "", dataSource: DATA_SOURCES[0], format: REPORT_FORMATS[0] });
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2 h-9 px-4">
        <FileText className="w-4 h-4" />
        Custom Report Builder
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="sm:max-w-md p-0 gap-0 overflow-hidden"
        >
          <DialogHeader className="px-6 py-5 border-b border-border">
            <DialogTitle className="text-base font-bold">
              Custom Report Builder
            </DialogTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Pick a data source and format to generate a custom report
              instantly.
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-5 flex flex-col gap-4">
              {/* Report Name */}
              <div className="grid gap-1.5">
                <Label htmlFor="reportName" className="text-sm font-semibold">
                  Report Name
                </Label>
                <Input
                  id="reportName"
                  name="name"
                  placeholder="e.g. Q2 Equipment Audit"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="h-9"
                />
              </div>

              {/* Data Source + Format */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label className="text-sm font-semibold">Data Source</Label>
                  <div className="relative">
                    <select
                      name="dataSource"
                      value={form.dataSource}
                      onChange={handleChange}
                      className={SELECT_CLASS}
                    >
                      {DATA_SOURCES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-sm font-semibold">Format</Label>
                  <div className="relative">
                    <select
                      name="format"
                      value={form.format}
                      onChange={handleChange}
                      className={SELECT_CLASS}
                    >
                      {REPORT_FORMATS.map((f) => (
                        <option key={f}>{f}</option>
                      ))}
                    </select>
                    <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
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
              <Button type="submit" className="h-9 px-5 gap-2">
                <Download className="w-4 h-4" />
                Generate &amp; Download
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
