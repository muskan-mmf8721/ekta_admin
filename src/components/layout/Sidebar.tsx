"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Anchor, 
  LayoutDashboard, 
  Wrench, 
  Zap, 
  TrainFront, 
  Warehouse, 
  Truck, 
  ClipboardCheck, 
  Ship,
  Bell,
  SlidersHorizontal,
  Users,
  Shield,
  FileText,
  Settings,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const operationsItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Equipment", href: "/equipment", icon: Wrench },
  { name: "Utility (DG Sets)", href: "/utility", icon: Zap },
  { name: "Rail Operations", href: "/rail", icon: TrainFront },
  { name: "Yard Operations", href: "/yard", icon: Warehouse },
  { name: "ITV Fleet", href: "/fleet", icon: Truck },
  { name: "Survey", href: "/survey", icon: ClipboardCheck },
  { name: "EXIM & Cargo", href: "/exim", icon: Ship },
];

const systemItems = [
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Alert Config", href: "/alert-config", icon: SlidersHorizontal },
  { name: "User Management", href: "/users", icon: Users },
  { name: "Roles & Permissions", href: "/roles", icon: Shield },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Configuration", href: "/config", icon: Settings },
  { name: "Audit Log", href: "/audit", icon: History },
];

export function Sidebar() {
  const pathname = usePathname();

  const renderNavItems = (items: typeof operationsItems) => (
    <ul className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <li key={item.name}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors",
                isActive 
                  ? "bg-sidebar-accent text-primary font-semibold" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside className="w-[260px] border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-3 px-6 h-16 shrink-0">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground">
          <Anchor className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm leading-tight text-white tracking-wide">POMS</span>
          <span className="text-[10px] text-sidebar-foreground/70 leading-tight">Port Operations Management</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
        <div className="mb-6">
          <h3 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50 mb-2">
            Operations
          </h3>
          {renderNavItems(operationsItems)}
        </div>

        <div>
          <h3 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50 mb-2">
            System
          </h3>
          {renderNavItems(systemItems)}
        </div>
      </div>

      <div className="p-4 shrink-0 mt-auto">
        <div className="flex items-center gap-3 px-3 py-2.5 bg-sidebar-accent rounded-xl hover:bg-sidebar-accent/80 cursor-pointer transition-colors">
          <Avatar className="h-8 w-8 bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">SA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-white truncate">Super Admin</span>
            <span className="text-[11px] text-sidebar-foreground/70 truncate">admin@poms.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
