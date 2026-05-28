import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true, // default to true, will be updated on mount
  isMobile: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setIsMobile: (isMobile) => set({ isMobile }),
}));
