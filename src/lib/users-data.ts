export type UserRole = "Super Admin" | "Admin" | "Operator" | "Viewer" | "Supervisor";
export type UserStatus = "Active" | "Inactive" | "Suspended";
export type UserDepartment =
  | "Operations"
  | "Maintenance"
  | "IT"
  | "Management"
  | "Logistics"
  | "Security";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: UserDepartment;
  status: UserStatus;
  lastLogin: string;
  createdAt: string;
  phone: string;
  avatar: string; // initials
  allottedMachines: string[]; // machine IDs
}

export const users: User[] = [
  {
    id: "USR-001",
    name: "Ravi Kumar",
    email: "ravi@port.com",
    role: "Operator",
    department: "Operations",
    status: "Active",
    lastLogin: "2 min ago",
    createdAt: "2024-01-15",
    phone: "+91 98765 43210",
    avatar: "RK",
    allottedMachines: ["RST-9"],
  },
  {
    id: "USR-002",
    name: "Amit Singh",
    email: "amit@port.com",
    role: "Operator",
    department: "Operations",
    status: "Active",
    lastLogin: "5 min ago",
    createdAt: "2024-02-20",
    phone: "+91 91234 56789",
    avatar: "AS",
    allottedMachines: [],
  },
  {
    id: "USR-003",
    name: "Priya Sharma",
    email: "priya@port.com",
    role: "Operator",
    department: "Operations",
    status: "Active",
    lastLogin: "8 min ago",
    createdAt: "2024-03-10",
    phone: "+91 87654 32109",
    avatar: "PS",
    allottedMachines: [],
  },
  {
    id: "USR-004",
    name: "Suresh P.",
    email: "suresh@port.com",
    role: "Supervisor",
    department: "Operations",
    status: "Active",
    lastLogin: "15 min ago",
    createdAt: "2024-03-22",
    phone: "+91 99887 76655",
    avatar: "SP",
    allottedMachines: [],
  },
  {
    id: "USR-005",
    name: "Deepak M.",
    email: "deepak@port.com",
    role: "Operator",
    department: "Maintenance",
    status: "Active",
    lastLogin: "18 min ago",
    createdAt: "2024-04-05",
    phone: "+91 96321 47895",
    avatar: "DM",
    allottedMachines: ["RTG-1"],
  },
  {
    id: "USR-006",
    name: "Vikram Joshi",
    email: "vikram@port.com",
    role: "Admin",
    department: "Management",
    status: "Active",
    lastLogin: "1 hr ago",
    createdAt: "2024-04-18",
    phone: "+91 93456 78901",
    avatar: "VJ",
    allottedMachines: [],
  },
  {
    id: "USR-007",
    name: "Meera R.",
    email: "meera@port.com",
    role: "Operator",
    department: "Logistics",
    status: "Active",
    lastLogin: "2 hrs ago",
    createdAt: "2024-05-01",
    phone: "+91 98001 23456",
    avatar: "MR",
    allottedMachines: [],
  },
  {
    id: "USR-008",
    name: "Sanjay T.",
    email: "sanjay@port.com",
    role: "Operator",
    department: "Operations",
    status: "Active",
    lastLogin: "45 min ago",
    createdAt: "2024-05-14",
    phone: "+91 94567 89012",
    avatar: "ST",
    allottedMachines: ["FLT-1", "FLT-2"],
  },
];

export const ROLES: UserRole[] = [
  "Super Admin",
  "Admin",
  "Supervisor",
  "Operator",
  "Viewer",
];

export const DEPARTMENTS: UserDepartment[] = [
  "Operations",
  "Maintenance",
  "IT",
  "Management",
  "Logistics",
  "Security",
];

export function getUser(id: string): User | undefined {
  return users.find((u) => u.id === id);
}
