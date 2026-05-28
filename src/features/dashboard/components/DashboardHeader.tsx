export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold tracking-tight">Operations Dashboard</h1>
      <p className="text-sm text-muted-foreground">
        Real-time overview of all port operations • {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>
    </div>
  );
}
