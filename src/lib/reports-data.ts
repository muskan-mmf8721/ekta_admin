export type ReportFrequency = "Monthly" | "Weekly";
export type ReportIcon = "bar-chart" | "file-text" | "clock";

export interface ReportCard {
  id: string;
  title: string;
  description: string;
  icon: ReportIcon;
  frequency: ReportFrequency;
  lastGenerated: string;
}

export interface ScheduledReport {
  id: string;
  name: string;
  schedule: string;
  recipients: string;
}

export const reportCards: ReportCard[] = [
  {
    id: "rpt-001",
    title: "Monthly SLA Report",
    description: "Full compliance report across all departments",
    icon: "bar-chart",
    frequency: "Monthly",
    lastGenerated: "Apr 1, 2026",
  },
  {
    id: "rpt-002",
    title: "Machine Performance Report",
    description: "Detailed analysis per machine",
    icon: "file-text",
    frequency: "Weekly",
    lastGenerated: "Apr 12, 2026",
  },
  {
    id: "rpt-003",
    title: "Department Summary",
    description: "Aggregated KPIs per department",
    icon: "bar-chart",
    frequency: "Monthly",
    lastGenerated: "Apr 1, 2026",
  },
  {
    id: "rpt-004",
    title: "Alert History Report",
    description: "All alerts with resolution status",
    icon: "clock",
    frequency: "Weekly",
    lastGenerated: "Apr 12, 2026",
  },
  {
    id: "rpt-005",
    title: "Container Movement Report",
    description: "EXIM/Domestic container handling",
    icon: "file-text",
    frequency: "Monthly",
    lastGenerated: "Apr 1, 2026",
  },
  {
    id: "rpt-006",
    title: "Fuel Consumption Report",
    description: "By machine and period",
    icon: "file-text",
    frequency: "Monthly",
    lastGenerated: "Apr 1, 2026",
  },
];

export const scheduledReports: ScheduledReport[] = [
  {
    id: "sch-001",
    name: "Monthly SLA Report",
    schedule: "1st of every month, 8:00 AM",
    recipients: "admin@poms.com, manager@port.com",
  },
  {
    id: "sch-002",
    name: "Weekly Machine Status",
    schedule: "Every Monday, 9:00 AM",
    recipients: "supervisor@port.com",
  },
];

export const DATA_SOURCES = [
  "Machines",
  "DG Sets",
  "Alerts",
  "Users",
  "Rail Operations",
  "Yard Operations",
  "EXIM/Cargo",
  "Fuel",
];

export const REPORT_FORMATS = ["CSV / Excel", "PDF", "JSON"];
