import { Machine, historicalTableData, maintenanceLogs } from "@/lib/machines-data";
import { DetailHeader } from "./DetailHeader";
import { StatCards } from "./StatCards";
import { HoursGauge } from "./HoursGauge";
import { RemainingHoursAlert } from "./RemainingHoursAlert";
import { HistoricalTable } from "./HistoricalTable";
import { MaintenanceLogs } from "./MaintenanceLogs";
import { ChartsRow, PerformanceChartsRow } from "./ChartsRow";

export function MachineDetailPage({ machine }: { machine: Machine }) {
  return (
    <div className="flex flex-col gap-5 pb-10">
      {/* Back button + machine identity */}
      <DetailHeader machine={machine} />

      {/* 4 stat cards */}
      <StatCards machine={machine} />

      {/* Gauge  |  Donut  |  Alert */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HoursGauge machine={machine} />
        <ChartsRow machine={machine} />
        <RemainingHoursAlert machine={machine} />
      </div>

      {/* 12-month trend + daily fuel (recharts, client-only) */}
      <PerformanceChartsRow />

      {/* 12-month historical table */}
      <HistoricalTable data={historicalTableData} />

      {/* Maintenance log timeline */}
      <MaintenanceLogs logs={maintenanceLogs} />
    </div>
  );
}
