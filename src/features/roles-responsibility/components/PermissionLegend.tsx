export function PermissionLegend() {
  const items = [
    {
      label: "Full",
      desc: "All actions including delete",
      badge: "bg-green-100 text-green-700 border border-green-200",
    },
    {
      label: "Edit",
      desc: "Read + update",
      badge: "bg-blue-100 text-blue-700 border border-blue-200",
    },
    {
      label: "Entry",
      desc: "Data entry only",
      badge: "bg-orange-100 text-orange-600 border border-orange-200",
    },
    {
      label: "View",
      desc: "Read-only access",
      badge: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm px-6 py-4">
      <h3 className="text-sm font-bold text-foreground mb-3">
        Permission Legend
      </h3>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {items.map(({ label, desc, badge }) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge}`}
            >
              {label}
            </span>
            <span className="text-xs text-muted-foreground">{desc}</span>
          </div>
        ))}
        {/* No access */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-medium">—</span>
          <span className="text-xs text-muted-foreground">No access</span>
        </div>
      </div>
    </div>
  );
}
