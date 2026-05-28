import { DashboardHeader } from "./components/DashboardHeader";
import { LiveActivityFeed } from "./components/LiveActivityFeed";
import { MachineHealthMap } from "./components/MachineHealthMap";
import { MetricsOverview } from "./components/MetricsOverview";
import { SlaDept } from "./components/sla-dept";
import { SlaTrend } from "./components/sla-trend";
import { ContainerChart } from "./components/container-chart";
import { MovesHR } from "./components/moves-hr";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <DashboardHeader />
      <MetricsOverview />

      {/* Machine Health Map + Live Activity Feed */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <MachineHealthMap />
        </div>
        <div className="xl:col-span-1">
          <LiveActivityFeed />
        </div>
      </div>

      {/* Charts Row: 2×2 grid matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SlaDept />
        <SlaTrend />
        <ContainerChart />
        <MovesHR />
      </div>
    </div>
  );
}

