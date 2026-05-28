"use client";

import dynamic from "next/dynamic";
import { Machine } from "@/lib/machines-data";

const HoursDistributionPie = dynamic(
  () => import("./HoursDistributionPie").then((m) => m.HoursDistributionPie),
  { ssr: false }
);

const PerformanceTrend = dynamic(
  () => import("./PerformanceTrend").then((m) => m.PerformanceTrend),
  { ssr: false }
);

const FuelChart = dynamic(
  () => import("./FuelChart").then((m) => m.FuelChart),
  { ssr: false }
);

/** Used in the gauge row — only the donut */
export function ChartsRow({ machine }: { machine: Machine }) {
  return <HoursDistributionPie machine={machine} />;
}

/** Used in the performance row — trend + fuel side by side */
export function PerformanceChartsRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PerformanceTrend />
      <FuelChart />
    </div>
  );
}
