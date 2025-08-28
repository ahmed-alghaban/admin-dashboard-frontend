import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "@/features/auth/authTypes.ts";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    { name: "auth-storage" }
  )
);
