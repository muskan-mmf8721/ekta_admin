"use client";

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Nov", containers: 4500, sla: 91 },
  { month: "Dec", containers: 3050, sla: 89 },
  { month: "Jan", containers: 3600, sla: 91 },
  { month: "Feb", containers: 4800, sla: 93 },
  { month: "Mar", containers: 4600, sla: 94 },
  { month: "Apr", containers: 4850, sla: 95 },
];

export function SlaTrend() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 h-full">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-foreground">SLA Compliance Trend</h2>
        <p className="text-xs text-muted-foreground mt-0.5">6-month compliance &amp; container volume</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="containerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#93c5fd" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#888" }}
            axisLine={false}
            tickLine={false}
          />
          {/* Left axis: SLA % */}
          <YAxis
            yAxisId="sla"
            domain={[80, 100]}
            tick={{ fontSize: 11, fill: "#888" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}`}
          />
          {/* Right axis: Containers */}
          <YAxis
            yAxisId="cont"
            orientation="right"
            domain={[0, 6000]}
            tick={{ fontSize: 11, fill: "#888" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}k`)}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
            formatter={(value: number, name: string) =>
              name === "sla" ? [`${value}%`, "SLA %"] : [value.toLocaleString(), "Containers"]
            }
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            formatter={(value) => (value === "containers" ? "Containers" : "SLA %")}
          />
          {/* Container area (filled) */}
          <Area
            yAxisId="cont"
            type="monotone"
            dataKey="containers"
            name="containers"
            stroke="#3b82f6"
            strokeWidth={1.5}
            fill="url(#containerGrad)"
            dot={false}
          />
          {/* SLA line */}
          <Line
            yAxisId="sla"
            type="monotone"
            dataKey="sla"
            name="sla"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
