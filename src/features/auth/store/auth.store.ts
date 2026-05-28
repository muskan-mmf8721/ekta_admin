import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: any | null;
  login: (token: string, user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null, // Ideally initialized from localStorage/cookies
  isAuthenticated: false,
  user: null,
  login: (token, user) => set({ token, isAuthenticated: true, user }),
  logout: () => set({ token: null, isAuthenticated: false, user: null }),
}));
