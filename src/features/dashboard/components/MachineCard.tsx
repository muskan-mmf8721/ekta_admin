export function MachineCard({ id, type, status, percentage, moves, target }: any) {
  return (
    <div className="border border-border rounded-lg p-4 flex flex-col items-center text-center">
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex flex-col items-start">
          <span className="font-bold text-sm">{id}</span>
          <span className="text-[11px] text-muted-foreground">{type}</span>
        </div>
        <div className="bg-success/10 text-success text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
          {status}
        </div>
      </div>
      
      <div className="w-16 h-16 rounded-full border-4 border-success flex items-center justify-center mb-4">
        <span className="text-sm font-bold">{percentage}%</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-sm font-bold">{moves}<span className="text-muted-foreground text-xs font-normal">/{target}h</span></div>
        <span className="text-[11px] text-muted-foreground">moves</span>
      </div>
    </div>
  );
}
