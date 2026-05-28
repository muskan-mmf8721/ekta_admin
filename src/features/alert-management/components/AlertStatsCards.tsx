import { alerts } from "@/lib/alerts-data";

export function AlertStatsCards() {
  const activeCritical = alerts.filter(
    (a) => a.status === "Active" && a.severity === "Critical"
  ).length;
  const activeWarnings = alerts.filter(
    (a) => a.status === "Active" && a.severity === "Warning"
  ).length;
  const acknowledged = alerts.filter((a) => a.status === "Acknowledged").length;
  const resolved = alerts.filter((a) => a.status === "Resolved").length;

  const cards = [
    {
      label: "ACTIVE CRITICAL",
      value: activeCritical,
      borderColor: "border-l-red-500",
      valueColor: "text-red-500",
    },
    {
      label: "ACTIVE WARNINGS",
      value: activeWarnings,
      borderColor: "border-l-orange-400",
      valueColor: "text-orange-400",
    },
    {
      label: "ACKNOWLEDGED",
      value: acknowledged,
      borderColor: "border-l-blue-500",
      valueColor: "text-blue-500",
    },
    {
      label: "RESOLVED",
      value: resolved,
      borderColor: "border-l-green-500",
      valueColor: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`bg-white rounded-xl border border-border border-l-4 ${card.borderColor} shadow-sm px-5 py-4`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            {card.label}
          </p>
          <p className={`text-3xl font-bold leading-none ${card.valueColor}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
