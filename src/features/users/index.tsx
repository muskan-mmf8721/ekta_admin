import { UserStatsCards } from "./components/UserStatsCards";
import { UsersTable } from "./components/UsersTable";
import { AddUserModal } from "./components/AddUserModal";

export function UserManagementPage() {
  return (
    <div className="flex flex-col gap-5 pb-10">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="header-section">
          <h1 className="text-2xl font-bold text-foreground">
            User Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage operators, supervisors, and admin accounts. Allot machines to operators.
          </p>
        </div>
        <AddUserModal />
      </div>

      {/* ── Stats Cards ── */}
      <UserStatsCards />

      {/* ── Users Table ── */}
      <UsersTable />
    </div>
  );
}
