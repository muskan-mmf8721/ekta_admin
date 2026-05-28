export interface ThresholdRule {
  id: string;
  alertType: string;
  parameter: string;
  warning: string;   // e.g. "70%" or ">40 min" or "—"
  critical: string;  // e.g. "90%"
  sos: string;       // e.g. "100%"
}

export interface EscalationRule {
  level: number;
  delay: string;   // e.g. "5 min"
  target: string;  // e.g. "Field Supervisor"
}

export const thresholdRules: ThresholdRule[] = [
  {
    id: "TR-001",
    alertType: "Machine Hours",
    parameter: "Breakdown hrs consumed",
    warning: "70%",
    critical: "90%",
    sos: "100%",
  },
  {
    id: "TR-002",
    alertType: "Machine Hours",
    parameter: "Preventive maint. hrs",
    warning: "80%",
    critical: "95%",
    sos: "100%",
  },
  {
    id: "TR-003",
    alertType: "Machine Performance",
    parameter: "Moves/Hr below SLA",
    warning: "<90%",
    critical: "<75%",
    sos: "<50%",
  },
  {
    id: "TR-004",
    alertType: "Rail Operations",
    parameter: "Min per container",
    warning: ">3.5 min",
    critical: ">4.5 min",
    sos: ">6 min",
  },
  {
    id: "TR-005",
    alertType: "Yard Operations",
    parameter: "Vehicle turnaround",
    warning: ">40 min",
    critical: ">55 min",
    sos: ">75 min",
  },
  {
    id: "TR-006",
    alertType: "Survey",
    parameter: "Survey time per rake",
    warning: ">55 min",
    critical: ">70 min",
    sos: ">90 min",
  },
  {
    id: "TR-007",
    alertType: "EXIM/Dom",
    parameter: "Container handling",
    warning: ">110 min (20ft)",
    critical: ">200 min (40ft)",
    sos: ">150 min",
  },
  {
    id: "TR-008",
    alertType: "FMS",
    parameter: "Compliance score",
    warning: "<80%",
    critical: "<65%",
    sos: "<50%",
  },
  {
    id: "TR-009",
    alertType: "Machine Status",
    parameter: "Unexpected breakdown",
    warning: "—",
    critical: "Immediate",
    sos: ">4 hrs",
  },
];

export const escalationRules: EscalationRule[] = [
  { level: 1, delay: "5 min",  target: "Field Supervisor" },
  { level: 2, delay: "15 min", target: "Department Manager" },
  { level: 3, delay: "30 min", target: "Operations Head + SMS" },
];
