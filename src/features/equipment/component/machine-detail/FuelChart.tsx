"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { dailyFuelData } from "@/lib/machines-data";

export function FuelChart() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-bold text-foreground">Daily Fuel Consumption</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Liters per day this month</p>
      </div>
      <ResponsiveContainer width="100%" height={230}>
        <AreaChart data={dailyFuelData} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="fuelGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="#e5e7eb" />
          <XAxis
            dataKey="day" axisLine={false} tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            ticks={[1, 5, 9, 13, 17, 21, 25, 29]}
          />
          <YAxis
            domain={[0, 200]} ticks={[0, 45, 90, 135, 180]}
            axisLine={false} tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
            formatter={(v: number) => [`${v} L`, "Fuel"]}
            labelFormatter={(d) => `Day ${d}`}
          />
          <Area
            type="monotone" dataKey="liters"
            stroke="#f59e0b" strokeWidth={2}
            fill="url(#fuelGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
