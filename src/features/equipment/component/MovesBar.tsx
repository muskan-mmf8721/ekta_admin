"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const data = [
  { machine: "RST-5",  actual: 6.1, target: 3.0 },
  { machine: "RST-6",  actual: 5.8, target: 3.0 },
  { machine: "RST-7",  actual: 4.5, target: 3.0 },
  { machine: "RST-8",  actual: 5.9, target: 3.0 },
  { machine: "RST-9",  actual: 5.4, target: 3.0 },
  { machine: "RST-10", actual: 5.7, target: 3.0 },
  { machine: "RST-11", actual: 5.8, target: 3.0 },
  { machine: "RST-12", actual: 2.9, target: 3.0 },
];

export function MovesBar() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">Moves/Hr Performance</h3>
        <p className="text-xs text-[#2563eb] mt-0.5">Actual vs SLA target (3.0 moves/hr)</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 8, left: -12, bottom: 0 }}
          barCategoryGap="30%"
          barGap={2}
        >
          <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="#e5e7eb" />
          <XAxis
            dataKey="machine"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#9ca3af" }}
          />
          <YAxis
            domain={[0, 8]}
            ticks={[0, 2, 4, 6, 8]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
          />
          <Tooltip
            cursor={{ fill: "#f3f4f6" }}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
            formatter={(value: number, name: string) => [
              `${value} moves/hr`,
              name === "actual" ? "Actual" : "SLA Target",
            ]}
          />
          <Legend
            iconType="square"
            iconSize={10}
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            formatter={(value) => (value === "actual" ? "Actual" : "SLA Target")}
          />
          <ReferenceLine y={3.0} stroke="#f97316" strokeDasharray="4 4" strokeWidth={1.5} />
          <Bar dataKey="actual" name="actual" fill="#2563eb" radius={[3, 3, 0, 0]} />
          <Bar dataKey="target" name="target" fill="#d1d5db" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
