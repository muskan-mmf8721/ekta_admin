"use client";

import dynamic from "next/dynamic";

const DGFuelChart = dynamic(
  () => import("./DGFuelChart").then((m) => m.DGFuelChart),
  { ssr: false }
);

const MaintenanceComplianceChart = dynamic(
  () => import("./MaintenanceComplianceChart").then((m) => m.MaintenanceComplianceChart),
  { ssr: false }
);

export function DGChartsRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DGFuelChart />
      <MaintenanceComplianceChart />
    </div>
  );
}
