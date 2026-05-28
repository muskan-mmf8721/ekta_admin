export type DGStatus = "Active" | "Warning" | "Critical";

export interface DGSet {
  id: string;
  capacity: string;
  description: string;
  status: DGStatus;
  utilization: number;
  utilizationLabel: string;
  fuelRate: string;
  hoursUsed: string;
  hoursAllowed: string;
  downtime: string;
}

export const dgSets: DGSet[] = [
  { id: "DG-01", capacity: "500 KVA", description: "500 KVA Diesel Generator • Power Backup System", status: "Active",  utilization: 84, utilizationLabel: "Warning",  fuelRate: "32 L/hr", hoursUsed: "420h", hoursAllowed: "500h", downtime: "4h"  },
  { id: "DG-02", capacity: "500 KVA", description: "500 KVA Diesel Generator • Power Backup System", status: "Active",  utilization: 76, utilizationLabel: "Normal",   fuelRate: "30 L/hr", hoursUsed: "380h", hoursAllowed: "500h", downtime: "2h"  },
  { id: "DG-03", capacity: "750 KVA", description: "750 KVA Diesel Generator • Power Backup System", status: "Warning", utilization: 92, utilizationLabel: "Critical",  fuelRate: "45 L/hr", hoursUsed: "460h", hoursAllowed: "500h", downtime: "8h"  },
  { id: "DG-04", capacity: "250 KVA", description: "250 KVA Diesel Generator • Power Backup System", status: "Active",  utilization: 70, utilizationLabel: "Normal",   fuelRate: "18 L/hr", hoursUsed: "210h", hoursAllowed: "500h", downtime: "1h"  },
];

export function getDG(id: string): DGSet | undefined {
  return dgSets.find((d) => d.id === id);
}

export const dailyFuelData = Array.from({ length: 29 }, (_, i) => ({
  day: i + 1,
  liters: 150 + Math.round(Math.sin(i * 0.35) * 18 + i * 0.6),
}));

export const maintenanceComplianceData = [
  { month: "Nov", pct: 92.1 },
  { month: "Dec", pct: 94.0 },
  { month: "Jan", pct: 93.5 },
  { month: "Feb", pct: 96.2 },
  { month: "Mar", pct: 95.6 },
  { month: "Apr", pct: 97.0 },
];

export interface DowntimeRecord {
  date: string;
  reason: string;
  duration: string;
  resolvedBy: string;
}

export const downtimeLogs: DowntimeRecord[] = [
  { date: "Apr 12", reason: "Routine PM service",         duration: "3 hrs", resolvedBy: "Tech Team" },
  { date: "Apr 05", reason: "Fuel filter replacement",    duration: "1 hr",  resolvedBy: "Deepak M." },
  { date: "Mar 22", reason: "Cooling system check",       duration: "2 hrs", resolvedBy: "Tech Team" },
  { date: "Mar 10", reason: "Battery bank maintenance",   duration: "1 hr",  resolvedBy: "Deepak M." },
  { date: "Feb 28", reason: "Oil & filter change",        duration: "2 hrs", resolvedBy: "Tech Team" },
];
