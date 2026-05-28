export type AlertSeverity = "Critical" | "Warning";
export type AlertStatus = "Active" | "Acknowledged" | "Resolved";
export type AlertType =
  | "Machine Hours"
  | "Machine Status"
  | "FMS"
  | "Yard"
  | "Fuel"
  | "Rail"
  | "DG Set"
  | "Utility";

export interface Alert {
  id: string;
  type: AlertType;
  source: string;
  severity: AlertSeverity;
  message: string;
  time: string;
  status: AlertStatus;
}

export const alerts: Alert[] = [
  {
    id: "ALT-001",
    type: "Machine Hours",
    source: "RST-9",
    severity: "Critical",
    message: "Breakdown hours at 96% of limit",
    time: "3 min ago",
    status: "Active",
  },
  {
    id: "ALT-002",
    type: "Machine Hours",
    source: "RST-7",
    severity: "Warning",
    message: "Preventive maintenance at 84%",
    time: "12 min ago",
    status: "Active",
  },
  {
    id: "ALT-003",
    type: "Machine Status",
    source: "RST-12",
    severity: "Critical",
    message: "Unexpected breakdown reported",
    time: "15 min ago",
    status: "Active",
  },
  {
    id: "ALT-004",
    type: "FMS",
    source: "Canteen",
    severity: "Warning",
    message: "Compliance score dropped to 78%",
    time: "22 min ago",
    status: "Active",
  },
  {
    id: "ALT-005",
    type: "Yard",
    source: "Gate-2",
    severity: "Warning",
    message: "Average turnaround > 40 min",
    time: "45 min ago",
    status: "Acknowledged",
  },
  {
    id: "ALT-006",
    type: "Fuel",
    source: "RST-6",
    severity: "Warning",
    message: "Fuel consumption 115% of average",
    time: "1 hr ago",
    status: "Acknowledged",
  },
  {
    id: "ALT-007",
    type: "Rail",
    source: "Rake RK-019",
    severity: "Warning",
    message: "Avg 3.5 min/container > SLA",
    time: "2 hrs ago",
    status: "Resolved",
  },
];
