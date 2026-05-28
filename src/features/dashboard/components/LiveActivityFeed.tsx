import { ActivityItem } from "./ActivityItem";

export function LiveActivityFeed() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-bold">Live Activity</h2>
          <p className="text-xs text-muted-foreground mt-1">Real-time operations feed</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] text-success font-medium uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 relative">
        <div className="absolute left-[9px] top-2 bottom-2 w-px bg-border -z-10" />
        <ActivityItem user="Ravi Kumar" action="logged 8.5 hrs on RST 9" time="2 min ago" type="success" />
        <ActivityItem user="System" action="RST-9 reached 96% breakdown limit" time="3 min ago" type="destructive" />
        <ActivityItem user="Amit Singh" action="submitted rake ADANI-042 data" time="5 min ago" type="success" />
        <ActivityItem user="Priya Sharma" action="logged vehicle KA-01-AB-1234 exit" time="8 min ago" type="success" />
        <ActivityItem user="System" action="RST-7 approaching warning threshold" time="12 min ago" type="warning" />
      </div>
    </div>
  );
}
