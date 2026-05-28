"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { performanceHistory } from "@/lib/machines-data";

export function PerformanceTrend() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">12-Month Performance Trend</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Hours and moves history</p>
      </div>
      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={performanceHistory} margin={{ top: 4, right: 36, left: -12, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="#e5e7eb" />
          <XAxis
            dataKey="month" axisLine={false} tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
          />
          {/* Left Y — Hours */}
          <YAxis
            yAxisId="hours"
            domain={[0, 220]} ticks={[0, 50, 100, 150, 200]}
            axisLine={false} tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
          />
          {/* Right Y — Moves */}
          <YAxis
            yAxisId="moves"
            orientation="right"
            domain={[0, 1400]} ticks={[0, 300, 600, 900, 1200]}
            axisLine={false} tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
          />
          <Legend
            iconType="circle" iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          />
          <Line
            yAxisId="hours" type="monotone" dataKey="hours" name="Hours"
            stroke="#2563eb" strokeWidth={2}
            dot={{ r: 4, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 5 }}
          />
          <Line
            yAxisId="moves" type="monotone" dataKey="moves" name="Moves"
            stroke="#f59e0b" strokeWidth={2}
            dot={{ r: 4, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
