"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Machine } from "@/lib/machines-data";

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
    <text
      x={x} y={y} fill="white"
      textAnchor="middle" dominantBaseline="central"
      fontSize={12} fontWeight={700}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export function HoursDistributionPie({ machine }: { machine: Machine }) {
  const total = machine.dailyMaintH + machine.preventiveH + machine.breakdownH;
  const idle = Math.max(0, machine.hoursUsed - total);

  const data = [
    { name: "Breakdown",   value: machine.breakdownH, color: "#ef4444" },
    { name: "Daily Maint", value: machine.dailyMaintH, color: "#2563eb" },
    { name: "Idle",        value: idle,                color: "#d1d5db" },
    { name: "Preventive",  value: machine.preventiveH, color: "#10b981" },
  ].filter((d) => d.value > 0);

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 flex flex-col gap-3">
      <div>
        <h3 className="text-sm font-bold text-foreground">Hours Distribution</h3>
        <p className="text-xs text-muted-foreground mt-0.5">By category</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            label={CustomLabel as any}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
            formatter={(v: number, name: string) => [`${v}h`, name]}
          />
          <Legend
            iconType="circle"
            iconSize={9}
            wrapperStyle={{ fontSize: 11, paddingTop: 4 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
