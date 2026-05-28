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
import { ROLES, DEPARTMENTS, UserRole, UserDepartment } from "@/lib/users-data";
import { UserPlus } from "lucide-react";

export function AddUserModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "" as UserRole | "",
    department: "" as UserDepartment | "",
    status: "Active",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // API integration will be added later
    setOpen(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      status: "Active",
    });
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2 h-9 px-4 cursor-pointer">
        <UserPlus className="w-4 h-4" />
        Create User
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="sm:max-w-lg p-0 gap-0 overflow-hidden"
        >
          <DialogHeader className="px-6 py-5 border-b border-border">
            <DialogTitle className="text-base font-bold">
              Add New User
            </DialogTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Fill in the details below to create a new user account.
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-5 flex flex-col gap-4">
              {/* Name */}
              <div className="grid gap-1.5">
                <Label htmlFor="name" className="text-xs font-semibold">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Rajesh Kumar"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="h-9"
                />
              </div>

              {/* Email */}
              <div className="grid gap-1.5">
                <Label htmlFor="email" className="text-xs font-semibold">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@poms.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="h-9"
                />
              </div>

              {/* Phone */}
              <div className="grid gap-1.5">
                <Label htmlFor="phone" className="text-xs font-semibold">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 00000 00000"
                  value={form.phone}
                  onChange={handleChange}
                  className="h-9"
                />
              </div>

              {/* Role + Department row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="role" className="text-xs font-semibold">
                    Role <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                    className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 transition-colors"
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-1.5">
                  <Label
                    htmlFor="department"
                    className="text-xs font-semibold"
                  >
                    Department <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="department"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    required
                    className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 transition-colors"
                  >
                    <option value="" disabled>
                      Select dept.
                    </option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status */}
              <div className="grid gap-1.5">
                <Label htmlFor="status" className="text-xs font-semibold">
                  Status
                </Label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 transition-colors"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border bg-muted/30 flex flex-row justify-end gap-2 rounded-b-xl">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="h-8 px-4 cursor-pointer"
              >
                Cancel
              </Button>
              <Button type="submit" className="h-8 px-4 cursor-pointer">
                Create User
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
