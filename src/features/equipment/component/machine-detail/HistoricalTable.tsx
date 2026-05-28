import { cn } from "@/lib/utils";

interface HistoricalRecord {
  month: string;
  hours: number;
  moves: number;
  fuel: number;
  breakdowns: number;
}

function BreakdownBadge({ count }: { count: number }) {
  const color =
    count === 0
      ? "bg-green-50 text-green-600"
      : count === 1
      ? "bg-orange-50 text-orange-500"
      : "bg-red-50 text-red-600";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold",
        color
      )}
    >
      {count}
    </span>
  );
}

export function HistoricalTable({ data }: { data: HistoricalRecord[] }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-bold text-foreground">
          12-Month Historical Performance
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Month", "Hours", "Moves", "Fuel (L)", "Breakdowns"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-medium text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.month}
                className="border-b border-border/50 hover:bg-muted/20 transition-colors"
              >
                <td className="px-5 py-4 font-bold text-foreground">{row.month}</td>
                <td className="px-5 py-4 text-muted-foreground">{row.hours}h</td>
                <td className="px-5 py-4 text-muted-foreground">{row.moves.toLocaleString()}</td>
                <td className="px-5 py-4 text-muted-foreground">{row.fuel.toLocaleString()}</td>
                <td className="px-5 py-4">
                  <BreakdownBadge count={row.breakdowns} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
