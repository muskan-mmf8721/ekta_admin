"use client";

import { useState } from "react";
import { users, User, UserStatus, UserRole } from "@/lib/users-data";
import { machines } from "@/lib/machines-data";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { EditUserModal } from "./EditUserModal";
import { DeleteUserModal } from "./DeleteUserModal";

// ── Status badge ─────────────────────────────────────────────────────────────
const statusStyle: Record<UserStatus, string> = {
  Active: "text-green-600",
  Inactive: "text-orange-500",
  Suspended: "text-red-500",
};

// ── Role badge ────────────────────────────────────────────────────────────────
const roleBadge: Record<UserRole, string> = {
  "Super Admin": "bg-purple-50 text-purple-700 border border-purple-200",
  Admin: "bg-blue-50 text-blue-700 border border-blue-200",
  Supervisor: "bg-teal-50 text-teal-700 border border-teal-200",
  Operator: "bg-gray-100 text-gray-700 border border-gray-200",
  Viewer: "bg-slate-50 text-slate-600 border border-slate-200",
};

// ── Avatar colour palette ─────────────────────────────────────────────────────
const palette = [
  "bg-blue-600",
  "bg-indigo-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-indigo-700",
  "bg-violet-600",
  "bg-cyan-600",
  "bg-blue-500",
];
const avatarBg = (i: number) => palette[i % palette.length];

// ── Machine type → colour tag ─────────────────────────────────────────────────
const typePill: Record<string, string> = {
  "RST Crane": "bg-blue-50 text-blue-700 border border-blue-200",
  ECH: "bg-purple-50 text-purple-700 border border-purple-200",
  Forklift: "bg-orange-50 text-orange-600 border border-orange-200",
  "RTG Crane": "bg-teal-50 text-teal-700 border border-teal-200",
  "RMG Crane": "bg-indigo-50 text-indigo-700 border border-indigo-200",
  "Terminal Tractor": "bg-gray-100 text-gray-700 border border-gray-200",
  "Reach Stacker": "bg-green-50 text-green-700 border border-green-200",
};

function AllottedMachinesCell({ ids }: { ids: string[] }) {
  if (!ids || ids.length === 0) {
    return <span className="text-orange-400 text-xs font-medium">Not allotted</span>;
  }

  // Group by type to show one type-tag per category
  const typeGroups: Record<string, string[]> = {};
  ids.forEach((id) => {
    const m = machines.find((mc) => mc.id === id);
    if (!m) return;
    if (!typeGroups[m.type]) typeGroups[m.type] = [];
    typeGroups[m.type].push(id);
  });

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {Object.entries(typeGroups).map(([type, machineIds]) => (
        <span
          key={type}
          className={cn(
            "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold",
            typePill[type] ?? "bg-gray-100 text-gray-600 border border-gray-200"
          )}
        >
          {/* small dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
          {type}
        </span>
      ))}
      {ids.map((id) => (
        <span
          key={id}
          className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-muted text-foreground border border-border"
        >
          {id}
        </span>
      ))}
    </div>
  );
}

// ── Filter options ─────────────────────────────────────────────────────────────
const ROLE_OPTIONS = ["All Roles", "Super Admin", "Admin", "Supervisor", "Operator", "Viewer"] as const;
const DEPT_OPTIONS = ["All Depts", "Operations", "Maintenance", "IT", "Management", "Logistics", "Security"] as const;

export function UsersTable() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [deptFilter, setDeptFilter] = useState("All Depts");

  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q);
    const matchRole = roleFilter === "All Roles" || u.role === roleFilter;
    const matchDept = deptFilter === "All Depts" || u.department === deptFilter;
    return matchSearch && matchRole && matchDept;
  });

  return (
    <>
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        {/* ── Toolbar ── */}
        <div className="px-5 py-3.5 border-b border-border flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search users…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Role filter */}
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-8 appearance-none pl-3 pr-7 rounded-lg border border-input bg-transparent text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
              >
                {ROLE_OPTIONS.map((r) => <option key={r}>{r}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            </div>

            {/* Dept filter */}
            <div className="relative">
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="h-8 appearance-none pl-3 pr-7 rounded-lg border border-input bg-transparent text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
              >
                {DEPT_OPTIONS.map((d) => <option key={d}>{d}</option>)}
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
                {["User", "Role", "Department", "Allotted Machines", "Status", "Last Login", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-muted-foreground">
                    No users match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((user, idx) => (
                  <tr
                    key={user.id}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    {/* User: avatar + name + email */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold",
                            avatarBg(idx)
                          )}
                        >
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground leading-tight text-sm">
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-3.5">
                      <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold", roleBadge[user.role])}>
                        {user.role}
                      </span>
                    </td>

                    {/* Department */}
                    <td className="px-5 py-3.5 text-sm text-foreground whitespace-nowrap">
                      {user.department}
                    </td>

                    {/* Allotted Machines */}
                    <td className="px-5 py-3.5">
                      <AllottedMachinesCell ids={user.allottedMachines} />
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span className={cn("text-sm font-semibold", statusStyle[user.status])}>
                        {user.status}
                      </span>
                    </td>

                    {/* Last Login */}
                    <td className="px-5 py-3.5 text-muted-foreground text-xs whitespace-nowrap">
                      {user.lastLogin}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditUser(user)}
                          className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-md hover:bg-blue-50 transition-colors group"
                          title="Edit user"
                        >
                          <Pencil className="w-3.5 h-3.5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                        </button>
                        <button
                          onClick={() => setDeleteUser(user)}
                          className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 transition-colors group"
                          title="Delete user"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-muted-foreground group-hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Footer ── */}
        <div className="px-5 py-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing {filtered.length} of {users.length} users
          </span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="xs" disabled>Previous</Button>
            <Button variant="default" size="xs" className="w-7 h-6 rounded-md">1</Button>
            <Button variant="outline" size="xs" disabled>Next</Button>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <EditUserModal user={editUser} onClose={() => setEditUser(null)} />
      <DeleteUserModal user={deleteUser} onClose={() => setDeleteUser(null)} />
    </>
  );
}
