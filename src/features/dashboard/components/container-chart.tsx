"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Nov", containers: 4700 },
  { month: "Dec", containers: 3400 },
  { month: "Jan", containers: 4900 },
  { month: "Feb", containers: 5200 },
  { month: "Mar", containers: 5500 },
  { month: "Apr", containers: 5700 },
];

export function ContainerChart() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 h-full">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-foreground">Monthly Containers Lifted</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Total containers across all equipment</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="40%">
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#888" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 6000]}
            ticks={[0, 1500, 3000, 4500, 6000]}
            tick={{ fontSize: 11, fill: "#888" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "#fff7ed" }}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
            formatter={(value: number) => [value.toLocaleString(), "Containers"]}
          />
          <Bar
            dataKey="containers"
            name="Containers"
            fill="#f97316"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
