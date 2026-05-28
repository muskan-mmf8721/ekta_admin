import { cn } from "@/lib/utils";

const machines = [
  { id: "RST-5",  type: "RST Crane",        status: "Active",    hoursUsed: 145, allowed: 200, utilization: 73,  moves: 892  },
  { id: "RST-6",  type: "RST Crane",        status: "Active",    hoursUsed: 178, allowed: 200, utilization: 89,  moves: 1034 },
  { id: "RST-7",  type: "RST Crane",        status: "Warning",   hoursUsed: 168, allowed: 200, utilization: 84,  moves: 756  },
  { id: "RST-8",  type: "RST Crane",        status: "Active",    hoursUsed: 112, allowed: 200, utilization: 56,  moves: 643  },
  { id: "RST-9",  type: "RST Crane",        status: "Critical",  hoursUsed: 192, allowed: 200, utilization: 96,  moves: 1122 },
  { id: "RST-10", type: "RST Crane",        status: "Active",    hoursUsed: 98,  allowed: 200, utilization: 49,  moves: 567  },
  { id: "RST-11", type: "RST Crane",        status: "Active",    hoursUsed: 134, allowed: 200, utilization: 67,  moves: 789  },
  { id: "RST-12", type: "RST Crane",        status: "Breakdown", hoursUsed: 156, allowed: 200, utilization: 78,  moves: 432  },
  { id: "RST-13", type: "RST Crane",        status: "Warning",   hoursUsed: 175, allowed: 200, utilization: 88,  moves: 901  },
  { id: "RST-14", type: "RST Crane",        status: "Active",    hoursUsed: 89,  allowed: 200, utilization: 45,  moves: 445  },
  { id: "ECH-01", type: "ECH",              status: "Active",    hoursUsed: 120, allowed: 180, utilization: 67,  moves: 678  },
  { id: "ECH-02", type: "ECH",              status: "Warning",   hoursUsed: 162, allowed: 180, utilization: 90,  moves: 812  },
  { id: "ECH-03", type: "ECH",              status: "Active",    hoursUsed: 95,  allowed: 180, utilization: 53,  moves: 540  },
  { id: "FLT-1",  type: "Forklift",         status: "Active",    hoursUsed: 78,  allowed: 160, utilization: 49,  moves: 234  },
  { id: "FLT-2",  type: "Forklift",         status: "Active",    hoursUsed: 102, allowed: 160, utilization: 64,  moves: 318  },
  { id: "FLT-3",  type: "Forklift",         status: "Critical",  hoursUsed: 152, allowed: 160, utilization: 95,  moves: 401  },
  { id: "RTG-1",  type: "RTG Crane",        status: "Active",    hoursUsed: 140, allowed: 220, utilization: 64,  moves: 925  },
  { id: "RTG-2",  type: "RTG Crane",        status: "Warning",   hoursUsed: 198, allowed: 220, utilization: 90,  moves: 1080 },
  { id: "RMG-1",  type: "RMG Crane",        status: "Active",    hoursUsed: 160, allowed: 240, utilization: 67,  moves: 1150 },
  { id: "RMG-2",  type: "RMG Crane",        status: "Active",    hoursUsed: 122, allowed: 240, utilization: 51,  moves: 870  },
  { id: "TT-01",  type: "Terminal Tractor", status: "Active",    hoursUsed: 88,  allowed: 180, utilization: 49,  moves: 412  },
  { id: "TT-02",  type: "Terminal Tractor", status: "Breakdown", hoursUsed: 134, allowed: 180, utilization: 74,  moves: 298  },
  { id: "TT-03",  type: "Terminal Tractor", status: "Active",    hoursUsed: 110, allowed: 180, utilization: 61,  moves: 502  },
  { id: "RS-01",  type: "Reach Stacker",    status: "Active",    hoursUsed: 145, allowed: 200, utilization: 73,  moves: 720  },
  { id: "RS-02",  type: "Reach Stacker",    status: "Warning",   hoursUsed: 162, allowed: 200, utilization: 81,  moves: 812  },
];

type Status = "Active" | "Warning" | "Critical" | "Breakdown";

const statusStyles: Record<Status, string> = {
  Active:    "bg-green-50  text-green-700  border border-green-200",
  Warning:   "bg-orange-50 text-orange-600 border border-orange-200",
  Critical:  "bg-red-50    text-red-600    border border-red-200",
  Breakdown: "bg-red-100   text-red-700    border border-red-300",
};

function UtilizationBar({ pct }: { pct: number }) {
  const barColor =
    pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-orange-400" : "bg-green-500";

  return (
    <div className="flex items-center gap-2.5 min-w-[130px]">
      <div className="flex-1 h-[6px] bg-gray-100 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground tabular-nums w-8 text-right">
        {pct}%
      </span>
    </div>
  );
}

export function MachineList() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-bold text-foreground">Machine Master List</h2>
      </div>

      {/* Scrollable table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Machine ID", "Type", "Status", "Hours Used", "Allowed", "Utilization", "Moves"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-5 py-3 text-left text-xs font-medium text-muted-foreground"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {machines.map((m) => (
              <tr
                key={m.id}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
              >
                {/* Machine ID */}
                <td className="px-5 py-3.5">
                  <span className="font-bold text-foreground">{m.id}</span>
                </td>

                {/* Type */}
                <td className="px-5 py-3.5 text-muted-foreground">{m.type}</td>

                {/* Status */}
                <td className="px-5 py-3.5">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      statusStyles[m.status as Status]
                    )}
                  >
                    {m.status}
                  </span>
                </td>

                {/* Hours Used */}
                <td className="px-5 py-3.5 text-foreground">{m.hoursUsed}h</td>

                {/* Allowed */}
                <td className="px-5 py-3.5 text-muted-foreground">{m.allowed}h</td>

                {/* Utilization */}
                <td className="px-5 py-3.5">
                  <UtilizationBar pct={m.utilization} />
                </td>

                {/* Moves */}
                <td className="px-5 py-3.5 text-foreground">
                  {m.moves.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
