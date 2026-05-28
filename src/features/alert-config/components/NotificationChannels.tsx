"use client";

import { useState } from "react";
import { Bell, Smartphone, MonitorX } from "lucide-react";

interface Channel {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const channels: Channel[] = [
  {
    id: "inapp",
    icon: Bell,
    title: "In-App Notification",
    description: "Bell icon counter, color-coded tray",
  },
  {
    id: "push",
    icon: Smartphone,
    title: "Mobile Push (FCM)",
    description: "Push to supervisor / operator phone",
  },
  {
    id: "sos",
    icon: MonitorX,
    title: "SOS Full-Screen Alert",
    description: "Overlay with sound on critical breach",
  },
];

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-green-500" : "bg-muted-foreground/30"
      }`}
      role="switch"
      aria-checked={enabled}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function NotificationChannels() {
  const [states, setStates] = useState<Record<string, boolean>>({
    inapp: true,
    push: true,
    sos: true,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {channels.map((ch) => (
        <div
          key={ch.id}
          className="bg-white rounded-xl border border-border shadow-sm px-5 py-4 flex items-center gap-4"
        >
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <ch.icon className="w-5 h-5 text-blue-500" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-tight">
              {ch.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {ch.description}
            </p>
          </div>

          {/* Toggle */}
          <Toggle
            enabled={states[ch.id]}
            onChange={(v) =>
              setStates((prev) => ({ ...prev, [ch.id]: v }))
            }
          />
        </div>
      ))}
    </div>
  );
}
