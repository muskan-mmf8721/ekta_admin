"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Nov", dg1: 93.5, dg2: 91.5 },
  { month: "Dec", dg1: 95.0, dg2: 93.0 },
  { month: "Jan", dg1: 96.2, dg2: 90.2 },
  { month: "Feb", dg1: 97.1, dg2: 93.8 },
  { month: "Mar", dg1: 95.6, dg2: 95.2 },
  { month: "Apr", dg1: 96.4, dg2: 93.6 },
];

export function AvailabilityTrend() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5">
      <h3 className="text-sm font-bold text-foreground mb-4">
        Availability Trend (%)
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 8, left: -10, bottom: 0 }}
          barCategoryGap="40%"
          barGap={3}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="4 4"
            stroke="#e5e7eb"
          />
          <XAxis
            dataKey="month"
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
          />
          <YAxis
            domain={[85, 100]}
            ticks={[85, 89, 93, 97, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
          />
          <Tooltip
            cursor={{ fill: "#f9fafb" }}
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            formatter={(value: number, name: string) => [
              `${value}%`,
              name === "dg1" ? "DG Set-1" : "DG Set-2",
            ]}
          />
          <Legend
            iconType="square"
            iconSize={11}
            wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
            formatter={(value) =>
              value === "dg1" ? "DG Set-1" : "DG Set-2"
            }
          />
          <Bar dataKey="dg1" name="dg1" fill="#f97316" radius={[3, 3, 0, 0]} />
          <Bar dataKey="dg2" name="dg2" fill="#3b82f6" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
