import { MetricCard } from "./MetricCard";

export function MetricsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard title="Active Machines" value="18" trend="+2 vs last month" status="success" />
      <MetricCard title="Warning Level" value="4" trend="+1 vs last month" status="warning" />
      <MetricCard title="Critical Level" value="2" trend="-1 vs last month" status="critical" />
      <MetricCard title="In Breakdown" value="1" trend="-0 vs last month" status="destructive" />
      
      <MetricCard title="Containers Today" value="342" trend="+28 vs last month" status="success" />
      <MetricCard title="Fleet SLA %" value="94.2%" trend="+1.8% vs last month" status="success" />
      <MetricCard title="Pending Alerts" value="7" trend="+3 vs last month" status="warning" />
      <MetricCard title="Active Operators" value="24" trend="+5 vs last month" status="success" />
    </div>
  );
}
