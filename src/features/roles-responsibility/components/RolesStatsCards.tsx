import { roles, MODULES } from "@/lib/roles-data";
import { users } from "@/lib/users-data";
import { Lock } from "lucide-react";

export function RolesStatsCards() {
  const totalRoles   = roles.length;
  const totalUsers   = users.length;
  const customRoles  = roles.filter((r) => r.isCustom).length;
  const moduleCount  = MODULES.length;

  const cards = [
    { label: "Total Roles",   value: totalRoles  },
    { label: "Total Users",   value: totalUsers  },
    { label: "Custom Roles",  value: customRoles },
    { label: "Modules",       value: moduleCount },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-xl border border-border shadow-sm px-5 py-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-3.5 h-3.5 text-blue-500" />
            <p className="text-xs font-semibold text-muted-foreground">
              {card.label}
            </p>
          </div>
          <p className="text-3xl font-bold text-foreground leading-none">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
