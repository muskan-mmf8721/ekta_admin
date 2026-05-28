"use client";

import { useState, useEffect } from "react";
import { User, ROLES, DEPARTMENTS, UserRole, UserDepartment } from "@/lib/users-data";
import { machines } from "@/lib/machines-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  user: User | null;
  onClose: () => void;
}

// Unique machine types for the category dropdown
const MACHINE_CATEGORIES = Array.from(new Set(machines.map((m) => m.type)));

const machineStatusColor: Record<string, string> = {
  Active: "text-green-600",
  Warning: "text-orange-500",
  Critical: "text-red-500",
  Breakdown: "text-red-600",
};

export function EditUserModal({ user, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "" as UserRole | "",
    department: "" as UserDepartment | "",
    status: "Active",
  });
  const [category, setCategory] = useState(MACHINE_CATEGORIES[0]);
  const [selected, setSelected] = useState<string[]>([]);

  // Sync form with the user being edited
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        status: user.status,
      });
      setSelected(user.allottedMachines ?? []);
      setCategory(MACHINE_CATEGORIES[0]);
    }
  }, [user]);

  const filteredMachines = machines.filter((m) => m.type === category);

  function toggleMachine(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // API integration will go here
    onClose();
  }

  return (
    <Dialog open={!!user} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        showCloseButton
        className="sm:max-w-2xl p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <DialogHeader className="px-6 py-5 border-b border-border shrink-0">
          <DialogTitle className="text-base font-bold">Edit User</DialogTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Update user details and machine allotment.
          </p>
        </DialogHeader>

        {/* Scrollable body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto flex-1">

            {/* Row 1: Full Name + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="edit-name" className="text-xs font-semibold">
                  Full Name
                </Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="h-9"
                  required
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="edit-email" className="text-xs font-semibold">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="h-9 text-muted-foreground"
                />
              </div>
            </div>

            {/* Row 2: Role + Department + Status */}
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="edit-role" className="text-xs font-semibold">
                  Role
                </Label>
                <div className="relative">
                  <select
                    id="edit-role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="h-9 w-full appearance-none rounded-lg border border-input bg-transparent pl-3 pr-8 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 transition-colors"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="edit-dept" className="text-xs font-semibold">
                  Department
                </Label>
                <div className="relative">
                  <select
                    id="edit-dept"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="h-9 w-full appearance-none rounded-lg border border-input bg-transparent pl-3 pr-8 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 transition-colors"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="edit-status" className="text-xs font-semibold">
                  Status
                </Label>
                <div className="relative">
                  <select
                    id="edit-status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="h-9 w-full appearance-none rounded-lg border border-input bg-transparent pl-3 pr-8 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 transition-colors"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Machine Allotment section */}
            <div className="border border-blue-200 rounded-xl overflow-hidden">
              {/* Section header */}
              <div className="bg-blue-50/60 px-4 py-3 border-b border-blue-200">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-foreground">
                    Machine Allotment
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Select a machine category, then pick the specific machines
                  this operator will run.
                </p>
              </div>

              <div className="p-4 flex flex-col gap-3">
                {/* Category select */}
                <div className="grid gap-1.5">
                  <Label className="text-xs font-semibold">
                    Machine Category
                  </Label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="h-9 w-full appearance-none rounded-lg border border-input bg-transparent pl-3 pr-8 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 transition-colors"
                    >
                      {MACHINE_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>

                {/* Machine grid */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-foreground">
                      Available Machines ({filteredMachines.length})
                    </span>
                    {selected.length > 0 && (
                      <span className="text-xs text-blue-600 font-semibold">
                        {selected.length} selected
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                    {filteredMachines.map((m) => {
                      const isSelected = selected.includes(m.id);
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => toggleMachine(m.id)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-all",
                            isSelected
                              ? "border-blue-500 bg-blue-50"
                              : "border-border bg-white hover:border-blue-200 hover:bg-blue-50/40"
                          )}
                        >
                          {/* Circle toggle */}
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                              isSelected
                                ? "border-blue-600 bg-blue-600"
                                : "border-muted-foreground/40"
                            )}
                          >
                            {isSelected && (
                              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                            )}
                          </div>

                          {/* Machine info */}
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-foreground leading-tight truncate">
                              {m.id}
                            </p>
                            <p
                              className={cn(
                                "text-[10px] font-medium leading-tight",
                                machineStatusColor[m.status]
                              )}
                            >
                              {m.status}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-end gap-3 shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9 px-5"
            >
              Cancel
            </Button>
            <Button type="submit" className="h-9 px-5">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
