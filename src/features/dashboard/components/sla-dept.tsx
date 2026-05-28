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
  { dept: "Equipment", current: 84, previous: 80 },
  { dept: "Utility",   current: 91, previous: 88 },
  { dept: "Rail",      current: 72, previous: 74 },
  { dept: "Yard",      current: 80, previous: 77 },
  { dept: "Survey",    current: 68, previous: 72 },
  { dept: "EXIM",      current: 86, previous: 82 },
  { dept: "Domestic",  current: 79, previous: 80 },
  { dept: "FMS",       current: 74, previous: 63 },
];

export function SlaDept() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 h-full">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-foreground">Department SLA Compliance</h2>
        <p className="text-xs text-[#2563eb] mt-0.5">Current month vs previous month (%)</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="30%" barGap={2}>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="dept"
            tick={{ fontSize: 11, fill: "#888" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[60, 100]}
            tick={{ fontSize: 11, fill: "#888" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}`}
          />
          <Tooltip
            cursor={{ fill: "#f5f5f5" }}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
            formatter={(value: number, name: string) => [`${value}%`, name === "current" ? "Current" : "Previous"]}
          />
          <Legend
            iconType="square"
            iconSize={10}
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            formatter={(value) => (value === "current" ? "Current" : "Previous")}
          />
          <Bar dataKey="current" name="current" fill="#2563eb" radius={[3, 3, 0, 0]} />
          <Bar dataKey="previous" name="previous" fill="#d1d5db" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
