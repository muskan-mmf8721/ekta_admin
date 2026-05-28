"use client";

import { Bell, Search, PanelLeft, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useUIStore } from "@/store/ui.store";

export function Navbar() {
  const { toggleSidebar } = useUIStore();

  return (
    <header className="h-[60px] bg-white border-b border-border flex items-center justify-between px-4 shrink-0 shadow-sm z-10 relative">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors focus:outline-none p-1 rounded-md hover:bg-muted"
        >
          <PanelLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>
        
        <div className="relative w-full max-w-md hidden sm:flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <Input
            type="text"
            placeholder="Search machines, reports, users..."
            className="w-full pl-9 bg-muted/30 border-transparent focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-border focus-visible:bg-white transition-all h-9 text-sm rounded-full"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6 ml-auto">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted focus:outline-none">
          <Bell className="h-5 w-5" strokeWidth={1.5} />
          <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-white flex items-center justify-center translate-x-1/4 -translate-y-1/4 ring-2 ring-white">
            7
          </span>
        </button>
        
        <div className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1.5 rounded-full pr-3 transition-colors">
          <Avatar className="h-8 w-8 bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">SA</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1.5 hidden md:flex">
            <span className="text-sm font-medium text-foreground">Super Admin</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </header>
  );
}
