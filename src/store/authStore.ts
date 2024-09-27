import { create } from "zustand";
interface AuthState {
  token: string | null;
  setAuthToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setAuthToken: (token: string) => set({ token }),
}));
