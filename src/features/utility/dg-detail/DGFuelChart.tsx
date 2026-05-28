"use client";

import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { dailyFuelData } from "@/lib/dg-data";

export function DGFuelChart() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 flex flex-col gap-3">
      <div>
        <h3 className="text-sm font-bold text-foreground">Daily Fuel Consumption</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Litres per day</p>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={dailyFuelData} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="dgFuelGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#f97316" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="#e5e7eb" />
          <XAxis
            dataKey="day"
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            ticks={[1, 5, 9, 13, 17, 21, 25, 29]}
          />
          <YAxis
            domain={[0, 200]}
            ticks={[0, 45, 90, 135, 180]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
            formatter={(v: number) => [`${v} L`, "Fuel"]}
            labelFormatter={(d) => `Day ${d}`}
          />
          <Area
            type="monotone"
            dataKey="liters"
            stroke="#f97316"
            strokeWidth={2}
            fill="url(#dgFuelGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
