import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface UIState {
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Global drawer management
  activeDrawer: string | null;
  drawerData: Record<string, unknown>;

  openDrawer: (drawerId: string, data?: unknown) => void;
  closeDrawer: () => void;
  setDrawerData: (drawerId: string, data: unknown) => void;
}

// Apply theme to document
const applyTheme = (theme: Theme) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
};

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: "system",
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },

      // Global drawer management
      activeDrawer: null,
      drawerData: {},

      openDrawer: (drawerId: string, data?: unknown) => {
        set({
          activeDrawer: drawerId,
          drawerData: data ? { [drawerId]: data } : {},
        });
      },

      closeDrawer: () => {
        set({
          activeDrawer: null,
          drawerData: {},
        });
      },

      setDrawerData: (drawerId: string, data: unknown) => {
        const currentData = get().drawerData;
        set({
          drawerData: { ...currentData, [drawerId]: data },
        });
      },
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({
        theme: state.theme,
        // Don't persist drawer state
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          // Apply theme on rehydration
          applyTheme(state.theme);
        }
      },
    }
  )
);

// Initialize theme on store creation
if (typeof window !== "undefined") {
  const savedTheme = localStorage.getItem("ui-storage");
  if (savedTheme) {
    try {
      const { state } = JSON.parse(savedTheme);
      if (state?.theme) {
        applyTheme(state.theme);
      }
    } catch (error) {
      console.warn("Failed to parse saved theme:", error);
    }
  }
}
