import { DGSet, downtimeLogs } from "@/lib/dg-data";
import { DGDetailHeader } from "./DGDetailHeader";
import { DGStatCards } from "./DGStatCards";
import { DGChartsRow } from "./DGChartsRow";
import { DowntimeLog } from "./DowntimeLog";

export function DGDetailPage({ dg }: { dg: DGSet }) {
  return (
    <div className="flex flex-col gap-5 pb-10">
      <DGDetailHeader dg={dg} />
      <DGStatCards dg={dg} />
      <DGChartsRow />
      <DowntimeLog logs={downtimeLogs} />
    </div>
  );
}
