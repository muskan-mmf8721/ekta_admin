"use client";

import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Dot,
} from "recharts";
import { maintenanceComplianceData } from "@/lib/dg-data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CircleDot(props: any) {
  const { cx, cy } = props;
  return (
    <circle cx={cx} cy={cy} r={5} fill="#10b981" stroke="#ffffff" strokeWidth={2} />
  );
}

export function MaintenanceComplianceChart() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 flex flex-col gap-3">
      <div>
        <h3 className="text-sm font-bold text-foreground">Maintenance Compliance %</h3>
        <p className="text-xs text-muted-foreground mt-0.5">6-month trend</p>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart
          data={maintenanceComplianceData}
          margin={{ top: 4, right: 8, left: -12, bottom: 0 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
          />
          <YAxis
            domain={[80, 100]}
            ticks={[80, 85, 90, 95, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
            formatter={(v: number) => [`${v}%`, "Compliance"]}
          />
          <Line
            type="monotone"
            dataKey="pct"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={<CircleDot />}
            activeDot={{ r: 6, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
