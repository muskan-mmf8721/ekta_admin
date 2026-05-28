import { MachineCard } from "./MachineCard";

export function MachineHealthMap() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-bold">Machine Health Map</h2>
          <p className="text-xs text-muted-foreground mt-1">Real-time fleet status - 25 machines</p>
        </div>
        <select className="text-sm border border-border rounded-md px-3 py-1.5 bg-muted/30 focus:outline-none focus:ring-1 focus:ring-ring">
          <option>All Machines</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <MachineCard id="RST-5" type="RST Crane" status="Active" percentage={73} moves={892} target={200} />
        <MachineCard id="RST-6" type="RST Crane" status="Active" percentage={89} moves={1034} target={200} />
        <MachineCard id="RST-7" type="RST Crane" status="Warning" percentage={84} moves={756} target={200} />
        <MachineCard id="RST-8" type="RST Crane" status="Active" percentage={56} moves={643} target={200} />
      </div>
    </div>
  );
}
