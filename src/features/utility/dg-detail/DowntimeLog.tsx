import { DowntimeRecord } from "@/lib/dg-data";

export function DowntimeLog({ logs }: { logs: DowntimeRecord[] }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-bold text-foreground">Downtime Log</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Date", "Reason", "Duration", "Resolved By"].map((h) => (
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
            {logs.map((row, i) => (
              <tr
                key={i}
                className="border-b border-border/50 hover:bg-muted/20 transition-colors"
              >
                <td className="px-5 py-4 font-bold text-foreground whitespace-nowrap">
                  {row.date}
                </td>
                <td className="px-5 py-4 text-blue-500 font-medium">
                  {row.reason}
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  {row.duration}
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  {row.resolvedBy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
