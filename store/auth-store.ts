import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name?: string;
    role: "TEACHER" | "STUDENT";
  } | null;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));