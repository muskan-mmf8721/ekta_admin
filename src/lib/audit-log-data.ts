export type AuditAction =
  | "Created User"
  | "Data Entry"
  | "Alert Triggered"
  | "Breakdown Report"
  | "Config Change"
  | "Login"
  | "Export";

export type AuditModule =
  | "User Management"
  | "Equipment"
  | "Alerts"
  | "Settings"
  | "Yard"
  | "Rail"
  | "Reports";

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  userInitial: string;
  action: AuditAction;
  module: AuditModule;
  detail: string;
  ip: string | null;
}

export const auditEntries: AuditEntry[] = [
  {
    id: "aud-001",
    timestamp: "Apr 14, 2026 10:30",
    user: "Admin",
    userInitial: "A",
    action: "Created User",
    module: "User Management",
    detail: "Created user Vikram Joshi",
    ip: "192.168.1.10",
  },
  {
    id: "aud-002",
    timestamp: "Apr 14, 2026 10:28",
    user: "Ravi Kumar",
    userInitial: "R",
    action: "Data Entry",
    module: "Equipment",
    detail: "Logged 8.5 hrs on RST-9",
    ip: "192.168.1.22",
  },
  {
    id: "aud-003",
    timestamp: "Apr 14, 2026 10:27",
    user: "System",
    userInitial: "S",
    action: "Alert Triggered",
    module: "Alerts",
    detail: "RST-9 breakdown hours at 96%",
    ip: null,
  },
  {
    id: "aud-004",
    timestamp: "Apr 14, 2026 10:15",
    user: "Suresh P.",
    userInitial: "S",
    action: "Breakdown Report",
    module: "Equipment",
    detail: "Reported breakdown on RST-12",
    ip: "192.168.1.87",
  },
  {
    id: "aud-005",
    timestamp: "Apr 14, 2026 09:45",
    user: "Admin",
    userInitial: "A",
    action: "Config Change",
    module: "Settings",
    detail: "Updated SLA target for Rail Ops",
    ip: "192.168.1.45",
  },
  {
    id: "aud-006",
    timestamp: "Apr 14, 2026 09:48",
    user: "Priya Sharma",
    userInitial: "P",
    action: "Data Entry",
    module: "Yard",
    detail: "Logged vehicle KA-01-AB-1234 exit",
    ip: "192.168.1.56",
  },
  {
    id: "aud-007",
    timestamp: "Apr 14, 2026 09:10",
    user: "Admin",
    userInitial: "A",
    action: "Config Change",
    module: "Alerts",
    detail: "Updated critical threshold for FMS compliance",
    ip: "192.168.1.45",
  },
  {
    id: "aud-008",
    timestamp: "Apr 14, 2026 08:55",
    user: "Deepak M.",
    userInitial: "D",
    action: "Data Entry",
    module: "Equipment",
    detail: "Logged fuel usage on RTG-1",
    ip: "192.168.1.33",
  },
  {
    id: "aud-009",
    timestamp: "Apr 14, 2026 08:30",
    user: "Priya Sharma",
    userInitial: "P",
    action: "Export",
    module: "Reports",
    detail: "Exported Monthly SLA Report as PDF",
    ip: "192.168.1.56",
  },
  {
    id: "aud-010",
    timestamp: "Apr 13, 2026 17:45",
    user: "System",
    userInitial: "S",
    action: "Alert Triggered",
    module: "Alerts",
    detail: "DG-03 utilization at 92% warning",
    ip: null,
  },
];

export const AUDIT_MODULES: AuditModule[] = [
  "User Management",
  "Equipment",
  "Alerts",
  "Settings",
  "Yard",
  "Rail",
  "Reports",
];

export const AUDIT_ACTIONS: AuditAction[] = [
  "Created User",
  "Data Entry",
  "Alert Triggered",
  "Breakdown Report",
  "Config Change",
  "Login",
  "Export",
];
