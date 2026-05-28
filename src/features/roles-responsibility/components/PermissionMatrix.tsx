"use client";

import { useState } from "react";
import { roles, Role, MODULES } from "@/lib/roles-data";
import { PermissionBadge } from "./PermissionBadge";
import { RoleFormModal } from "./RoleFormModal";
import { Copy } from "lucide-react";

export function PermissionMatrix() {
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  function openEdit(role: Role) {
    setEditRole(role);
    setEditOpen(true);
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Section header */}
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-sm font-bold text-foreground">
            Permission Matrix
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Module-level access by role
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap min-w-[160px]">
                  Role
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">
                  Users
                </th>
                {MODULES.map((mod) => (
                  <th
                    key={mod.key}
                    className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap"
                  >
                    {mod.label}
                  </th>
                ))}
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {roles.map((role) => (
                <tr
                  key={role.id}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  {/* Role name */}
                  <td className="px-6 py-4 font-semibold text-foreground whitespace-nowrap">
                    {role.name}
                  </td>

                  {/* User count badge */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-2 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                      {role.userCount}
                    </span>
                  </td>

                  {/* Permission per module */}
                  {MODULES.map((mod) => (
                    <td key={mod.key} className="px-5 py-4 whitespace-nowrap">
                      <PermissionBadge level={role.permissions[mod.key]} />
                    </td>
                  ))}

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(role)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        className="w-7 h-7 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
                        title="Clone role"
                      >
                        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RoleFormModal
        open={editOpen}
        onClose={() => { setEditOpen(false); setEditRole(null); }}
        role={editRole}
      />
    </>
  );
}
