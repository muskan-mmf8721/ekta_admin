"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Nov", moves: 3.25 },
  { month: "Dec", moves: 2.95 },
  { month: "Jan", moves: 3.20 },
  { month: "Feb", moves: 3.50 },
  { month: "Mar", moves: 3.70 },
  { month: "Apr", moves: 3.75 },
];

export function MovesHR() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 h-full">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-foreground">Avg Moves/Hr Trend</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Fleet average performance per hour</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#888" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[2.5, 4]}
            ticks={[2.5, 2.8, 3.1, 3.4, 3.7, 4.0]}
            tick={{ fontSize: 11, fill: "#888" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v.toFixed(1)}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
            formatter={(value: number) => [`${value.toFixed(2)}`, "Moves/Hr"]}
          />
          <Line
            type="monotone"
            dataKey="moves"
            name="Moves/Hr"
            stroke="#a855f7"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#a855f7", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
