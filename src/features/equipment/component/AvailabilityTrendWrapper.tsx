"use client";

import dynamic from "next/dynamic";

const AvailabilityTrend = dynamic(
  () => import("./AvailabilityTrend").then((m) => m.AvailabilityTrend),
  { ssr: false }
);

export function AvailabilityTrendWrapper() {
  return <AvailabilityTrend />;
}
