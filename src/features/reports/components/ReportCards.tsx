import { reportCards, ReportCard, ReportIcon } from "@/lib/reports-data";
import { BarChart2, FileText, Clock, Download, Calendar } from "lucide-react";

const iconMap: Record<ReportIcon, React.ElementType> = {
  "bar-chart": BarChart2,
  "file-text": FileText,
  clock: Clock,
};

function ReportCardItem({ report }: { report: ReportCard }) {
  const Icon = iconMap[report.icon];

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm flex flex-col overflow-hidden">
      {/* Top section */}
      <div className="px-5 py-4 flex items-start gap-4 flex-1">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
          <Icon className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground leading-tight">
            {report.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {report.description}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Bottom section */}
      <div className="px-5 py-3 flex items-center justify-between gap-3">
        {/* Frequency + last date */}
        <div className="flex items-center gap-2 text-xs">
          <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="font-semibold text-blue-600">
            {report.frequency}
          </span>
          <span className="text-muted-foreground">
            Last: {report.lastGenerated}
          </span>
        </div>

        {/* Download buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 h-7 px-3 rounded-lg border border-border bg-white hover:bg-muted text-xs font-semibold text-foreground transition-colors">
            <Download className="w-3 h-3" />
            PDF
          </button>
          <button className="flex items-center gap-1.5 h-7 px-3 rounded-lg border border-border bg-white hover:bg-muted text-xs font-semibold text-foreground transition-colors">
            <Download className="w-3 h-3" />
            Excel
          </button>
        </div>
      </div>
    </div>
  );
}

export function ReportCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reportCards.map((report) => (
        <ReportCardItem key={report.id} report={report} />
      ))}
    </div>
  );
}
