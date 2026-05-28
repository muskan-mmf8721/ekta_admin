"use client";

import { useState } from "react";
import { RolesStatsCards } from "./components/RolesStatsCards";
import { PermissionMatrix } from "./components/PermissionMatrix";
import { PermissionLegend } from "./components/PermissionLegend";
import { RoleFormModal } from "./components/RoleFormModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function RolesPermissionsPage() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 pb-10">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Roles &amp; Permissions
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage system roles and module-level permissions
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="gap-2 h-9 px-4 shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Role
        </Button>
      </div>

      {/* ── Stats Cards ── */}
      <RolesStatsCards />

      {/* ── Permission Matrix ── */}
      <PermissionMatrix />

      {/* ── Permission Legend ── */}
      <PermissionLegend />

      {/* ── Create Role Modal ── */}
      <RoleFormModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </div>
  );
}
