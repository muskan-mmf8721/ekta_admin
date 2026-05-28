"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useUIStore } from "@/store/ui.store";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, setSidebarOpen, isMobile, setIsMobile } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      const isMobileView = window.innerWidth < 991;
      
      if (useUIStore.getState().isMobile !== isMobileView) {
        setIsMobile(isMobileView);
        // Default to closed on mobile, open on desktop
        setSidebarOpen(!isMobileView);
      }
    };

    // Initial check without relying on state change loop
    const initialMobileView = window.innerWidth < 991;
    setIsMobile(initialMobileView);
    setSidebarOpen(!initialMobileView);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile, setSidebarOpen]);

  // Don't render until mounted to prevent hydration errors with window object
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground relative">
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-20 transition-opacity backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar Wrapper with smooth slide & width transition */}
      <div 
        className={`z-30 h-full transition-all duration-300 ease-in-out flex-shrink-0 overflow-hidden ${
          isMobile ? "fixed inset-y-0 left-0" : "relative"
        } ${isSidebarOpen ? "w-[260px]" : "w-0"}`}
      >
        {/* Inner fixed-width container prevents content squishing during transition */}
        <div className={`w-[260px] h-full transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
          <Sidebar />
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-muted/30">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
