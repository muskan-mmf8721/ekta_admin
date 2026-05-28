export type PermissionLevel = "Full" | "Edit" | "Entry" | "View" | null;

export interface RolePermissions {
  equipment: PermissionLevel;
  rail: PermissionLevel;
  yard: PermissionLevel;
  exim: PermissionLevel;
  users: PermissionLevel;
  reports: PermissionLevel;
  settings: PermissionLevel;
}

export interface Role {
  id: string;
  name: string;
  userCount: number;
  isCustom: boolean;
  permissions: RolePermissions;
}

export const MODULES: { key: keyof RolePermissions; label: string }[] = [
  { key: "equipment", label: "Equipment" },
  { key: "rail",      label: "Rail" },
  { key: "yard",      label: "Yard" },
  { key: "exim",      label: "Exim" },
  { key: "users",     label: "Users" },
  { key: "reports",   label: "Reports" },
  { key: "settings",  label: "Settings" },
];

export const PERMISSION_LEVELS: PermissionLevel[] = [
  null, "View", "Entry", "Edit", "Full",
];

export const roles: Role[] = [
  {
    id: "role-001",
    name: "Super Admin",
    userCount: 2,
    isCustom: false,
    permissions: {
      equipment: "Full",
      rail:      "Full",
      yard:      "Full",
      exim:      "Full",
      users:     "Full",
      reports:   "Full",
      settings:  "Full",
    },
  },
  {
    id: "role-002",
    name: "Dept. Manager",
    userCount: 8,
    isCustom: false,
    permissions: {
      equipment: "View",
      rail:      "Full",
      yard:      "View",
      exim:      "View",
      users:     null,
      reports:   "View",
      settings:  null,
    },
  },
  {
    id: "role-003",
    name: "Field Supervisor",
    userCount: 12,
    isCustom: false,
    permissions: {
      equipment: "Edit",
      rail:      "Edit",
      yard:      "Edit",
      exim:      "Edit",
      users:     null,
      reports:   "View",
      settings:  null,
    },
  },
  {
    id: "role-004",
    name: "Machine Operator",
    userCount: 28,
    isCustom: true,
    permissions: {
      equipment: "Entry",
      rail:      null,
      yard:      null,
      exim:      null,
      users:     null,
      reports:   null,
      settings:  null,
    },
  },
  {
    id: "role-005",
    name: "Rail Operator",
    userCount: 9,
    isCustom: true,
    permissions: {
      equipment: null,
      rail:      "Entry",
      yard:      null,
      exim:      null,
      users:     null,
      reports:   null,
      settings:  null,
    },
  },
  {
    id: "role-006",
    name: "Warehouse Staff",
    userCount: 14,
    isCustom: true,
    permissions: {
      equipment: null,
      rail:      null,
      yard:      null,
      exim:      "Entry",
      users:     null,
      reports:   null,
      settings:  null,
    },
  },
  {
    id: "role-007",
    name: "FMS Staff",
    userCount: 6,
    isCustom: false,
    permissions: {
      equipment: null,
      rail:      null,
      yard:      null,
      exim:      null,
      users:     null,
      reports:   null,
      settings:  null,
    },
  },
];
