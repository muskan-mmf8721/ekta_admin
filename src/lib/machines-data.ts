export type MachineStatus = "Active" | "Warning" | "Critical" | "Breakdown";

export interface Machine {
  id: string;
  type: string;
  department: string;
  status: MachineStatus;
  operator: string;
  lastEntry: string;
  hoursUsed: number;
  hoursAllowed: number;
  moves: number;
  movesHr: number;
  slaTarget: number;
  fuelUsedL: number;
  fuelChange: string;
  utilization: number;
  dailyMaintH: number;
  preventiveH: number;
  breakdownH: number;
}

export const machines: Machine[] = [
  { id: "RST-5",  type: "RST Crane",         department: "Equipment Department", status: "Active",    operator: "Ravi Kumar",   lastEntry: "2 min ago",  hoursUsed: 145, hoursAllowed: 200, moves: 892,  movesHr: 3.7, slaTarget: 3.0, fuelUsedL: 4900, fuelChange: "+5% vs last",  utilization: 73, dailyMaintH: 85, preventiveH: 60, breakdownH: 35 },
  { id: "RST-6",  type: "RST Crane",         department: "Equipment Department", status: "Active",    operator: "Arjun S.",     lastEntry: "5 min ago",  hoursUsed: 178, hoursAllowed: 200, moves: 1034, movesHr: 5.8, slaTarget: 3.0, fuelUsedL: 5200, fuelChange: "+2% vs last",  utilization: 89, dailyMaintH: 90, preventiveH: 55, breakdownH: 20 },
  { id: "RST-7",  type: "RST Crane",         department: "Equipment Department", status: "Warning",   operator: "Suresh P.",    lastEntry: "12 min ago", hoursUsed: 168, hoursAllowed: 200, moves: 756,  movesHr: 4.5, slaTarget: 3.0, fuelUsedL: 4700, fuelChange: "-1% vs last",  utilization: 84, dailyMaintH: 80, preventiveH: 50, breakdownH: 30 },
  { id: "RST-8",  type: "RST Crane",         department: "Equipment Department", status: "Active",    operator: "Ravi Kumar",   lastEntry: "8 min ago",  hoursUsed: 112, hoursAllowed: 200, moves: 643,  movesHr: 5.7, slaTarget: 3.0, fuelUsedL: 3900, fuelChange: "+3% vs last",  utilization: 56, dailyMaintH: 60, preventiveH: 40, breakdownH: 10 },
  { id: "RST-9",  type: "RST Crane",         department: "Equipment Department", status: "Critical",  operator: "Tech Team",    lastEntry: "1 hr ago",   hoursUsed: 192, hoursAllowed: 200, moves: 1122, movesHr: 5.4, slaTarget: 3.0, fuelUsedL: 5600, fuelChange: "+8% vs last",  utilization: 96, dailyMaintH: 95, preventiveH: 65, breakdownH: 45 },
  { id: "RST-10", type: "RST Crane",         department: "Equipment Department", status: "Active",    operator: "Arjun S.",     lastEntry: "3 min ago",  hoursUsed: 98,  hoursAllowed: 200, moves: 567,  movesHr: 5.9, slaTarget: 3.0, fuelUsedL: 3600, fuelChange: "+1% vs last",  utilization: 49, dailyMaintH: 50, preventiveH: 35, breakdownH: 8  },
  { id: "RST-11", type: "RST Crane",         department: "Equipment Department", status: "Active",    operator: "Ravi Kumar",   lastEntry: "6 min ago",  hoursUsed: 134, hoursAllowed: 200, moves: 789,  movesHr: 5.8, slaTarget: 3.0, fuelUsedL: 4400, fuelChange: "+4% vs last",  utilization: 67, dailyMaintH: 75, preventiveH: 45, breakdownH: 12 },
  { id: "RST-12", type: "RST Crane",         department: "Equipment Department", status: "Breakdown", operator: "Suresh P.",    lastEntry: "2 hr ago",   hoursUsed: 156, hoursAllowed: 200, moves: 432,  movesHr: 2.9, slaTarget: 3.0, fuelUsedL: 4100, fuelChange: "-3% vs last",  utilization: 78, dailyMaintH: 82, preventiveH: 52, breakdownH: 50 },
  { id: "RST-13", type: "RST Crane",         department: "Equipment Department", status: "Warning",   operator: "Ravi Kumar",   lastEntry: "20 min ago", hoursUsed: 175, hoursAllowed: 200, moves: 901,  movesHr: 4.8, slaTarget: 3.0, fuelUsedL: 5000, fuelChange: "+6% vs last",  utilization: 88, dailyMaintH: 88, preventiveH: 58, breakdownH: 25 },
  { id: "RST-14", type: "RST Crane",         department: "Equipment Department", status: "Active",    operator: "Arjun S.",     lastEntry: "4 min ago",  hoursUsed: 89,  hoursAllowed: 200, moves: 445,  movesHr: 4.2, slaTarget: 3.0, fuelUsedL: 3200, fuelChange: "+0% vs last",  utilization: 45, dailyMaintH: 45, preventiveH: 30, breakdownH: 5  },
  { id: "ECH-01", type: "ECH",               department: "Equipment Department", status: "Active",    operator: "Ravi Kumar",   lastEntry: "7 min ago",  hoursUsed: 120, hoursAllowed: 180, moves: 678,  movesHr: 4.2, slaTarget: 3.0, fuelUsedL: 3800, fuelChange: "+2% vs last",  utilization: 67, dailyMaintH: 65, preventiveH: 40, breakdownH: 12 },
  { id: "ECH-02", type: "ECH",               department: "Equipment Department", status: "Warning",   operator: "Suresh P.",    lastEntry: "15 min ago", hoursUsed: 162, hoursAllowed: 180, moves: 812,  movesHr: 3.9, slaTarget: 3.0, fuelUsedL: 4600, fuelChange: "+5% vs last",  utilization: 90, dailyMaintH: 85, preventiveH: 50, breakdownH: 28 },
  { id: "ECH-03", type: "ECH",               department: "Equipment Department", status: "Active",    operator: "Arjun S.",     lastEntry: "9 min ago",  hoursUsed: 95,  hoursAllowed: 180, moves: 540,  movesHr: 4.0, slaTarget: 3.0, fuelUsedL: 3300, fuelChange: "+1% vs last",  utilization: 53, dailyMaintH: 52, preventiveH: 30, breakdownH: 8  },
  { id: "FLT-1",  type: "Forklift",          department: "Yard Department",      status: "Active",    operator: "Ravi Kumar",   lastEntry: "2 min ago",  hoursUsed: 78,  hoursAllowed: 160, moves: 234,  movesHr: 3.1, slaTarget: 3.0, fuelUsedL: 2400, fuelChange: "+1% vs last",  utilization: 49, dailyMaintH: 40, preventiveH: 25, breakdownH: 6  },
  { id: "FLT-2",  type: "Forklift",          department: "Yard Department",      status: "Active",    operator: "Arjun S.",     lastEntry: "5 min ago",  hoursUsed: 102, hoursAllowed: 160, moves: 318,  movesHr: 3.3, slaTarget: 3.0, fuelUsedL: 3100, fuelChange: "+2% vs last",  utilization: 64, dailyMaintH: 55, preventiveH: 35, breakdownH: 8  },
  { id: "FLT-3",  type: "Forklift",          department: "Yard Department",      status: "Critical",  operator: "Tech Team",    lastEntry: "3 hr ago",   hoursUsed: 152, hoursAllowed: 160, moves: 401,  movesHr: 3.0, slaTarget: 3.0, fuelUsedL: 4200, fuelChange: "+10% vs last", utilization: 95, dailyMaintH: 78, preventiveH: 48, breakdownH: 42 },
  { id: "RTG-1",  type: "RTG Crane",         department: "Equipment Department", status: "Active",    operator: "Ravi Kumar",   lastEntry: "3 min ago",  hoursUsed: 140, hoursAllowed: 220, moves: 925,  movesHr: 5.2, slaTarget: 3.0, fuelUsedL: 4800, fuelChange: "+3% vs last",  utilization: 64, dailyMaintH: 72, preventiveH: 44, breakdownH: 18 },
  { id: "RTG-2",  type: "RTG Crane",         department: "Equipment Department", status: "Warning",   operator: "Suresh P.",    lastEntry: "18 min ago", hoursUsed: 198, hoursAllowed: 220, moves: 1080, movesHr: 5.5, slaTarget: 3.0, fuelUsedL: 5500, fuelChange: "+7% vs last",  utilization: 90, dailyMaintH: 95, preventiveH: 60, breakdownH: 38 },
  { id: "RMG-1",  type: "RMG Crane",         department: "Equipment Department", status: "Active",    operator: "Arjun S.",     lastEntry: "4 min ago",  hoursUsed: 160, hoursAllowed: 240, moves: 1150, movesHr: 6.0, slaTarget: 3.0, fuelUsedL: 5100, fuelChange: "+4% vs last",  utilization: 67, dailyMaintH: 82, preventiveH: 50, breakdownH: 22 },
  { id: "RMG-2",  type: "RMG Crane",         department: "Equipment Department", status: "Active",    operator: "Ravi Kumar",   lastEntry: "6 min ago",  hoursUsed: 122, hoursAllowed: 240, moves: 870,  movesHr: 5.6, slaTarget: 3.0, fuelUsedL: 4000, fuelChange: "+2% vs last",  utilization: 51, dailyMaintH: 65, preventiveH: 40, breakdownH: 14 },
  { id: "TT-01",  type: "Terminal Tractor",  department: "Yard Department",      status: "Active",    operator: "Arjun S.",     lastEntry: "1 min ago",  hoursUsed: 88,  hoursAllowed: 180, moves: 412,  movesHr: 3.5, slaTarget: 3.0, fuelUsedL: 2800, fuelChange: "+1% vs last",  utilization: 49, dailyMaintH: 45, preventiveH: 28, breakdownH: 7  },
  { id: "TT-02",  type: "Terminal Tractor",  department: "Yard Department",      status: "Breakdown", operator: "Tech Team",    lastEntry: "4 hr ago",   hoursUsed: 134, hoursAllowed: 180, moves: 298,  movesHr: 2.4, slaTarget: 3.0, fuelUsedL: 3500, fuelChange: "-2% vs last",  utilization: 74, dailyMaintH: 68, preventiveH: 42, breakdownH: 48 },
  { id: "TT-03",  type: "Terminal Tractor",  department: "Yard Department",      status: "Active",    operator: "Ravi Kumar",   lastEntry: "8 min ago",  hoursUsed: 110, hoursAllowed: 180, moves: 502,  movesHr: 3.8, slaTarget: 3.0, fuelUsedL: 3300, fuelChange: "+3% vs last",  utilization: 61, dailyMaintH: 58, preventiveH: 36, breakdownH: 10 },
  { id: "RS-01",  type: "Reach Stacker",     department: "Equipment Department", status: "Active",    operator: "Suresh P.",    lastEntry: "5 min ago",  hoursUsed: 145, hoursAllowed: 200, moves: 720,  movesHr: 4.4, slaTarget: 3.0, fuelUsedL: 4300, fuelChange: "+2% vs last",  utilization: 73, dailyMaintH: 75, preventiveH: 46, breakdownH: 18 },
  { id: "RS-02",  type: "Reach Stacker",     department: "Equipment Department", status: "Warning",   operator: "Arjun S.",     lastEntry: "22 min ago", hoursUsed: 162, hoursAllowed: 200, moves: 812,  movesHr: 4.1, slaTarget: 3.0, fuelUsedL: 4800, fuelChange: "+6% vs last",  utilization: 81, dailyMaintH: 84, preventiveH: 52, breakdownH: 30 },
];

export function getMachine(id: string): Machine | undefined {
  return machines.find((m) => m.id === id);
}

// ── Detail-page static data (shared across all machines for demo) ──────────

export const performanceHistory = [
  { month: "May", hours: 165, moves: 820  },
  { month: "Jun", hours: 172, moves: 845  },
  { month: "Jul", hours: 158, moves: 790  },
  { month: "Aug", hours: 180, moves: 900  },
  { month: "Sep", hours: 175, moves: 880  },
  { month: "Oct", hours: 168, moves: 860  },
  { month: "Nov", hours: 182, moves: 920  },
  { month: "Dec", hours: 170, moves: 850  },
  { month: "Jan", hours: 178, moves: 905  },
  { month: "Feb", hours: 185, moves: 940  },
  { month: "Mar", hours: 188, moves: 960  },
  { month: "Apr", hours: 192, moves: 1122 },
];

export const dailyFuelData = Array.from({ length: 29 }, (_, i) => ({
  day: i + 1,
  liters: 140 + Math.round(Math.sin(i * 0.4) * 15 + i * 1.2),
}));

export const historicalTableData = [
  { month: "May", hours: 165, moves: 820,  fuel: 4200, breakdowns: 1 },
  { month: "Jun", hours: 172, moves: 845,  fuel: 4350, breakdowns: 0 },
  { month: "Jul", hours: 158, moves: 790,  fuel: 4100, breakdowns: 2 },
  { month: "Aug", hours: 180, moves: 900,  fuel: 4500, breakdowns: 1 },
  { month: "Sep", hours: 175, moves: 880,  fuel: 4400, breakdowns: 0 },
  { month: "Oct", hours: 168, moves: 860,  fuel: 4250, breakdowns: 1 },
  { month: "Nov", hours: 182, moves: 920,  fuel: 4600, breakdowns: 1 },
  { month: "Dec", hours: 170, moves: 850,  fuel: 4300, breakdowns: 2 },
  { month: "Jan", hours: 178, moves: 905,  fuel: 4500, breakdowns: 0 },
  { month: "Feb", hours: 185, moves: 940,  fuel: 4700, breakdowns: 1 },
  { month: "Mar", hours: 188, moves: 960,  fuel: 4750, breakdowns: 0 },
  { month: "Apr", hours: 192, moves: 1122, fuel: 4900, breakdowns: 1 },
];

export interface MaintenanceLog {
  type: "Breakdown" | "Daily Maint." | "Preventive";
  description: string;
  date: string;
  technician: string;
  duration: string;
}

export const maintenanceLogs: MaintenanceLog[] = [
  { type: "Breakdown",    description: "Hydraulic pressure drop, seal replaced",  date: "Apr 14, 2026 09:30", technician: "Suresh P.",  duration: "2.5 hrs" },
  { type: "Daily Maint.", description: "Routine lube and filter check",            date: "Apr 10, 2026 14:00", technician: "Ravi Kumar", duration: "0.5 hr"  },
  { type: "Preventive",   description: "Quarterly preventive maintenance",         date: "Apr 05, 2026 08:15", technician: "Tech Team",  duration: "4 hrs"   },
  { type: "Daily Maint.", description: "Tyre pressure adjustment",                 date: "Mar 28, 2026 11:20", technician: "Ravi Kumar", duration: "0.4 hr"  },
  { type: "Breakdown",    description: "Sensor fault, wiring repair",              date: "Mar 18, 2026 16:00", technician: "Suresh P.",  duration: "1.2 hrs" },
];
