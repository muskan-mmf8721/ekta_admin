"use client";

import { useState } from "react";
import { Filter, Download, Plus, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

const TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "rst", label: "RST" },
  { value: "ech", label: "ECH" },
  { value: "forklift", label: "Forklift" },
  { value: "rtg", label: "RTG" },
  { value: "rmg", label: "RMG" },
  { value: "terminal-tractor", label: "Terminal Tractor" },
  { value: "reach-stacker", label: "Reach Stacker" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "idle", label: "Idle" },
  { value: "maintenance", label: "Maintenance" },
  { value: "out-of-service", label: "Out of Service" },
];

export function EHeader() {
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");

  const typeLabel = TYPE_OPTIONS.find((o) => o.value === type)?.label ?? "All Types";
  const statusLabel = STATUS_OPTIONS.find((o) => o.value === status)?.label ?? "All Status";

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Equipment Management
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          RST, ECH, Forklift, RTG, RMG, Terminal Tractor, Reach Stacker — Fleet
          overview & analytics
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex items-center border border-border bg-white rounded-md shadow-sm h-9 px-3 hover:bg-muted/50 transition-colors">
                <Filter className="w-4 h-4 text-muted-foreground mr-2" />
                <span className="text-sm font-medium mr-4">{typeLabel}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            }
          />
          <DropdownMenuContent align="start" className="min-w-48">
            <DropdownMenuRadioGroup value={type} onValueChange={setType}>
              {TYPE_OPTIONS.map((opt) => (
                <DropdownMenuRadioItem key={opt.value} value={opt.value}>
                  {opt.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex items-center border border-border bg-white rounded-md shadow-sm h-9 px-3 hover:bg-muted/50 transition-colors">
                <span className="text-sm font-medium mr-4">{statusLabel}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            }
          />
          <DropdownMenuContent align="start" className="min-w-48">
            <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
              {STATUS_OPTIONS.map((opt) => (
                <DropdownMenuRadioItem key={opt.value} value={opt.value}>
                  {opt.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <button className="flex items-center border border-border bg-white rounded-md shadow-sm h-9 px-3 hover:bg-muted/50 transition-colors text-sm font-medium">
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>

        <button className="">
          <Plus className="w-4 h-4 mr-2" strokeWidth={3} />
          Add Machine
        </button>
      </div>
    </div>
  );
}
