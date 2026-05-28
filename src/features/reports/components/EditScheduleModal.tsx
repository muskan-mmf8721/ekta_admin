"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScheduledReport } from "@/lib/reports-data";

interface Props {
  report: ScheduledReport | null;
  onClose: () => void;
}

export function EditScheduleModal({ report, onClose }: Props) {
  const [schedule, setSchedule] = useState("");
  const [recipients, setRecipients] = useState("");

  useEffect(() => {
    if (report) {
      setSchedule(report.schedule);
      setRecipients(report.recipients);
    }
  }, [report]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // API integration will go here
    onClose();
  }

  return (
    <Dialog open={!!report} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent
        showCloseButton
        className="sm:max-w-sm p-0 gap-0 overflow-hidden"
      >
        <DialogHeader className="px-6 py-5 border-b border-border">
          <DialogTitle className="text-base font-bold">
            Edit Schedule
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Update the cadence and recipients for this scheduled report.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 flex flex-col gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="schedule" className="text-sm font-semibold">
                Schedule
              </Label>
              <Input
                id="schedule"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="h-9"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="recipients" className="text-sm font-semibold">
                Recipients (comma separated)
              </Label>
              <Input
                id="recipients"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                className="h-9"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9 px-5"
            >
              Cancel
            </Button>
            <Button type="submit" className="h-9 px-5">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
