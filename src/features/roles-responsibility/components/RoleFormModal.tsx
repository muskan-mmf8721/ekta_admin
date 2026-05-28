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
import {
  Role,
  RolePermissions,
  PermissionLevel,
  MODULES,
  PERMISSION_LEVELS,
} from "@/lib/roles-data";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Pass a role to edit it; omit for create mode */
  role?: Role | null;
}

const SELECT_CLASS =
  "h-9 w-full appearance-none rounded-lg border border-input bg-transparent pl-3 pr-8 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 transition-colors";

function ModuleSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: PermissionLevel;
  onChange: (v: PermissionLevel) => void;
}) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs font-semibold text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
        <select
          value={value ?? ""}
          onChange={(e) =>
            onChange((e.target.value as PermissionLevel) || null)
          }
          className={SELECT_CLASS}
        >
          {PERMISSION_LEVELS.map((p) => (
            <option key={p ?? "none"} value={p ?? ""}>
              {p ?? "—"}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

const emptyPerms = (): RolePermissions => ({
  equipment: null,
  rail:      null,
  yard:      null,
  exim:      null,
  users:     null,
  reports:   null,
  settings:  null,
});

export function RoleFormModal({ open, onClose, role }: Props) {
  const isEdit = !!role;

  const [name, setName] = useState("");
  const [initialUsers, setInitialUsers] = useState("0");
  const [perms, setPerms] = useState<RolePermissions>(emptyPerms());

  useEffect(() => {
    if (role) {
      setName(role.name);
      setInitialUsers(String(role.userCount));
      setPerms({ ...role.permissions });
    } else {
      setName("");
      setInitialUsers("0");
      setPerms(emptyPerms());
    }
  }, [role, open]);

  function setPerm(key: keyof RolePermissions, val: PermissionLevel) {
    setPerms((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // API integration will go here
    onClose();
  }

  // Pair modules for 2-col layout, last odd one gets its own row
  const modulePairs: (typeof MODULES[number])[][] = [];
  for (let i = 0; i < MODULES.length; i += 2) {
    modulePairs.push(MODULES.slice(i, i + 2));
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent
        showCloseButton
        className="sm:max-w-lg p-0 gap-0 overflow-hidden"
      >
        <DialogHeader className="px-6 py-5 border-b border-border">
          <DialogTitle className="text-base font-bold">
            {isEdit ? "Edit Role" : "Create Role"}
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isEdit
              ? "Update the role name and module permissions."
              : "Set the role name and per-module permission level."}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 flex flex-col gap-4">
            {/* Role Name + Initial Users */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="roleName" className="text-xs font-semibold">
                  Role Name
                </Label>
                <Input
                  id="roleName"
                  placeholder="e.g. Yard Manager"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-9"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="initialUsers" className="text-xs font-semibold">
                  Initial Users
                </Label>
                <Input
                  id="initialUsers"
                  type="number"
                  min="0"
                  value={initialUsers}
                  onChange={(e) => setInitialUsers(e.target.value)}
                  className="h-9"
                />
              </div>
            </div>

            {/* Module permissions grid */}
            <div className="flex flex-col gap-3">
              {modulePairs.map((pair, i) => (
                <div
                  key={i}
                  className={cn(
                    "grid gap-4",
                    pair.length === 2 ? "grid-cols-2" : "grid-cols-2"
                  )}
                >
                  {pair.map((mod) => (
                    <ModuleSelect
                      key={mod.key}
                      label={mod.label}
                      value={perms[mod.key]}
                      onChange={(v) => setPerm(mod.key, v)}
                    />
                  ))}
                  {/* empty spacer if odd */}
                  {pair.length === 1 && <div />}
                </div>
              ))}
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
              {isEdit ? "Save Changes" : "Create Role"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
