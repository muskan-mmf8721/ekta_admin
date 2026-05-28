"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Breakdown",    value: 18, color: "#ef4444" },
  { name: "Daily Maint",  value: 42, color: "#2563eb" },
  { name: "Preventive",   value: 40, color: "#d1d5db" },
];

const RADIAN = Math.PI / 180;

function CustomLabel({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: {
  cx: number; cy: number; midAngle: number;
  innerRadius: number; outerRadius: number; percent: number;
}) {
  if (percent < 0.08) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export function HoursGraph() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">Hours Distribution</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Fleet-wide maintenance breakdown</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
            label={CustomLabel as any}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
            formatter={(value: number, name: string) => [`${value}%`, name]}
          />
          <Legend
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ fontSize: 12, paddingTop: 4 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
