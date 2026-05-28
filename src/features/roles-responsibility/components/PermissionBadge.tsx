import { PermissionLevel } from "@/lib/roles-data";
import { cn } from "@/lib/utils";

const badgeStyle: Record<NonNullable<PermissionLevel>, string> = {
  Full:  "bg-green-100  text-green-700  border border-green-200",
  Edit:  "bg-blue-100   text-blue-700   border border-blue-200",
  Entry: "bg-orange-100 text-orange-600 border border-orange-200",
  View:  "bg-yellow-100 text-yellow-700 border border-yellow-200",
};

export function PermissionBadge({ level }: { level: PermissionLevel }) {
  if (!level) {
    return <span className="text-muted-foreground text-sm">—</span>;
  }
  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-semibold",
        badgeStyle[level]
      )}
    >
      {level}
    </span>
  );
}
