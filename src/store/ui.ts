import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface UIState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

// Apply theme to document
const applyTheme = (theme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches ? "dark" : "light";
        root.classList.add(systemTheme);
    } else {
        root.classList.add(theme);
    }
};

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            theme: "system",
            setTheme: (theme) => {
                set({ theme });
                applyTheme(theme);
            },
        }),
        {
            name: "ui-storage",
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
