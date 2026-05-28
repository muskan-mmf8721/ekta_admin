import { users } from "@/lib/users-data";

export function UserStatsCards() {
  const total = users.length;
  const active = users.filter((u) => u.status === "Active").length;
  const operatorsWithMachines = users.filter(
    (u) => u.role === "Operator" && u.allottedMachines.length > 0
  ).length;
  const inactive = users.filter((u) => u.status === "Inactive").length;

  const cards = [
    {
      label: "TOTAL USERS",
      value: total,
      valueClass: "text-foreground",
    },
    {
      label: "ACTIVE",
      value: active,
      valueClass: "text-foreground",
    },
    {
      label: "OPERATORS W/ MACHINES",
      value: operatorsWithMachines,
      valueClass: "text-foreground",
    },
    {
      label: "INACTIVE",
      value: inactive,
      valueClass: "text-orange-500",
      dot: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-xl border border-border shadow-sm px-5 py-4"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            {card.label}
          </p>
          <div className="flex items-center gap-2">
            <p className={`text-3xl font-bold leading-none ${card.valueClass}`}>
              {card.value}
            </p>
            {card.dot && card.value > 0 && (
              <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
