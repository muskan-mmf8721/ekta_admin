"use client";

import dynamic from "next/dynamic";

const MovesBar = dynamic(
  () => import("./MovesBar").then((m) => m.MovesBar),
  { ssr: false }
);

const HoursGraph = dynamic(
  () => import("./HoursGraph").then((m) => m.HoursGraph),
  { ssr: false }
);

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MovesBar />
      <HoursGraph />
    </div>
  );
}
