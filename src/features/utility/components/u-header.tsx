import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type DGStatus = "Active" | "Warning" | "Critical";

interface DGSet {
  id: string;
  capacity: string;
  status: DGStatus;
  utilization: number;
  fuelRate: string;
  hoursUsed: string;
  downtime: string;
}

const dgSets: DGSet[] = [
  {
    id: "DG-01",
    capacity: "500 KVA",
    status: "Active",
    utilization: 84,
    fuelRate: "32L/h",
    hoursUsed: "420h",
    downtime: "4h",
  },
  {
    id: "DG-02",
    capacity: "500 KVA",
    status: "Active",
    utilization: 76,
    fuelRate: "30L/h",
    hoursUsed: "380h",
    downtime: "2h",
  },
  {
    id: "DG-03",
    capacity: "750 KVA",
    status: "Warning",
    utilization: 92,
    fuelRate: "45L/h",
    hoursUsed: "460h",
    downtime: "8h",
  },
  {
    id: "DG-04",
    capacity: "250 KVA",
    status: "Active",
    utilization: 70,
    fuelRate: "18L/h",
    hoursUsed: "210h",
    downtime: "1h",
  },
];

const statusStyle: Record<DGStatus, string> = {
  Active: "bg-green-500  text-white",
  Warning: "bg-orange-400 text-white",
  Critical: "bg-red-500    text-white",
};


function StatBox({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-muted/40 rounded-lg px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </p>
      <p
        className={cn(
          "text-base font-bold text-foreground leading-none",
          valueClass,
        )}
      >
        {value}
      </p>
    </div>
  );
}


export function UHeader() {
  return (
    <div>
      <div className="header-section">
        <h1 className="text-2xl font-bold text-foreground">
          Utility Module (DG Sets)
        </h1>
        <p className="text-sm text-muted-foreground">
          Power generation availability & maintenance tracking
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
        {dgSets.map((dg) => (
          <Link key={dg.id} href={`/utility/${encodeURIComponent(dg.id)}`} className="bg-white border border-border rounded-xl shadow-sm p-4 flex flex-col gap-3 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-400 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground leading-tight">
                    {dg.id}
                  </h3>
                  <p className="text-xs text-muted-foreground">{dg.capacity}</p>
                </div>
              </div>

              {/* Status badge */}
              <span
                className={cn(
                  "shrink-0 px-3 py-1 rounded-full text-xs font-semibold",
                  statusStyle[dg.status],
                )}
              >
                {dg.status}
              </span>
            </div>

            {/* Stats — 2×2 grid */}
            <div className="grid grid-cols-2 gap-2">
              <StatBox label="Utilization" value={`${dg.utilization}%`} />
              <StatBox label="Fuel Rate" value={dg.fuelRate} />
              <StatBox label="Hours Used" value={dg.hoursUsed} />
              <StatBox
                label="Downtime"
                value={dg.downtime}
                valueClass="text-red-500"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
