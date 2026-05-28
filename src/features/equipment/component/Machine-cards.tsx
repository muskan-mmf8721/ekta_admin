import Link from "next/link";
import { cn } from "@/lib/utils";

// Dummy data based on the screenshot
const machines = [
  { id: "RST-5", type: "RST Crane", status: "Active", percentage: 73, currentH: 145, targetH: 200, moves: 892 },
  { id: "RST-6", type: "RST Crane", status: "Active", percentage: 89, currentH: 178, targetH: 200, moves: 1034 },
  { id: "RST-7", type: "RST Crane", status: "Warning", percentage: 84, currentH: 168, targetH: 200, moves: 756 },
  { id: "RST-8", type: "RST Crane", status: "Active", percentage: 56, currentH: 112, targetH: 200, moves: 643 },
  { id: "RST-9", type: "RST Crane", status: "Critical", percentage: 98, currentH: 192, targetH: 200, moves: 1122 },
  { id: "RST-10", type: "RST Crane", status: "Active", percentage: 49, currentH: 98, targetH: 200, moves: 567 },
  { id: "RST-11", type: "RST Crane", status: "Active", percentage: 67, currentH: 134, targetH: 200, moves: 789 },
  { id: "RST-12", type: "RST Crane", status: "Breakdown", percentage: 78, currentH: 156, targetH: 200, moves: 432 },
  { id: "RST-13", type: "RST Crane", status: "Warning", percentage: 88, currentH: 175, targetH: 200, moves: 901 },
  { id: "RST-14", type: "RST Crane", status: "Active", percentage: 45, currentH: 89, targetH: 200, moves: 445 },
  { id: "ECH-01", type: "ECH", status: "Active", percentage: 67, currentH: 120, targetH: 180, moves: 678 },
  { id: "ECH-02", type: "ECH", status: "Warning", percentage: 90, currentH: 162, targetH: 180, moves: 812 },
  { id: "ECH-03", type: "ECH", status: "Active", percentage: 53, currentH: 95, targetH: 180, moves: 540 },
  { id: "FLT-1", type: "Forklift", status: "Active", percentage: 49, currentH: 78, targetH: 160, moves: 234 },
  { id: "FLT-2", type: "Forklift", status: "Active", percentage: 64, currentH: 102, targetH: 160, moves: 318 },
  { id: "FLT-3", type: "Forklift", status: "Critical", percentage: 95, currentH: 152, targetH: 180, moves: 401 },
  { id: "RTG-1", type: "RTG Crane", status: "Active", percentage: 64, currentH: 140, targetH: 220, moves: 925 },
  { id: "RTG-2", type: "RTG Crane", status: "Warning", percentage: 90, currentH: 198, targetH: 220, moves: 1080 },
  { id: "RMG-1", type: "RMG Crane", status: "Active", percentage: 67, currentH: 160, targetH: 240, moves: 1150 },
  { id: "RMG-2", type: "RMG Crane", status: "Active", percentage: 51, currentH: 122, targetH: 240, moves: 870 },
  { id: "TT-01", type: "Terminal Tractor", status: "Active", percentage: 49, currentH: 88, targetH: 180, moves: 412 },
  { id: "TT-02", type: "Terminal Tractor", status: "Breakdown", percentage: 74, currentH: 134, targetH: 180, moves: 298 },
  { id: "TT-03", type: "Terminal Tractor", status: "Active", percentage: 61, currentH: 110, targetH: 180, moves: 502 },
  { id: "RS-01", type: "Reach Stacker", status: "Active", percentage: 73, currentH: 145, targetH: 200, moves: 720 },
  { id: "RS-02", type: "Reach Stacker", status: "Warning", percentage: 81, currentH: 162, targetH: 200, moves: 812 },
];

function CircularProgress({ percentage }: { percentage: number }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let color = "#10b981"; // success
  if (percentage >= 70 && percentage < 90) color = "#f59e0b"; // warning
  if (percentage >= 90) color = "#ef4444"; // critical

  return (
    <div className="relative flex items-center justify-center w-14 h-14 shrink-0">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          className="text-muted/30"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="28"
          cy="28"
        />
        <circle
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="28"
          cy="28"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <span className="absolute text-sm font-bold text-foreground">{percentage}%</span>
    </div>
  );
}

export function MachineCards() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs text-muted-foreground -mt-1">
        Showing <span className="font-bold text-foreground">25</span> of 25 machines
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
        {machines.map((machine, idx) => {
          let statusBg = "bg-[#10b981]";
          if (machine.status === "Warning") statusBg = "bg-[#f59e0b]";
          if (machine.status === "Critical" || machine.status === "Breakdown") statusBg = "bg-[#ef4444]";

          return (
            <Link key={idx} href={`/equipment/${encodeURIComponent(machine.id)}`} className="bg-white rounded-xl border border-border shadow-sm p-4 flex flex-col justify-between h-[130px] hover:border-primary/40 hover:shadow-md transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="flex flex-col truncate pr-2">
                  <span className="font-bold text-[15px] text-foreground leading-tight truncate">{machine.id}</span>
                  <span className="text-[11px] text-muted-foreground truncate">{machine.type}</span>
                </div>
                
                <div className={cn("flex items-center px-2 py-[3px] rounded-full text-[10px] font-bold text-white tracking-wide shadow-sm shrink-0", statusBg)}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
                  {machine.status}
                </div>
              </div>

              <div className="flex justify-between items-end mt-2">
                <CircularProgress percentage={machine.percentage} />
                
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-bold text-base text-foreground leading-none">{machine.currentH}</span>
                    <span className="text-[10px] text-muted-foreground font-medium">/{machine.targetH}h</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground mt-1">{machine.moves} moves</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
