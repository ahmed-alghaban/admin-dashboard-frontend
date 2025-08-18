import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserPreferences {
  tableSort: {
    field: string;
    direction: "asc" | "desc";
  };
  tableFilters: Record<string, string | number | boolean>;
  pageSize: number;
  showInactiveUsers: boolean;
}

interface UserPreferencesStore extends UserPreferences {
  // Actions
  updateSort: (field: string, direction: "asc" | "desc") => void;
  updateFilters: (filters: Record<string, string | number | boolean>) => void;
  setPageSize: (size: number) => void;
  toggleInactiveUsers: () => void;
  resetPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  tableSort: {
    field: "createdAt",
    direction: "desc",
  },
  tableFilters: {},
  pageSize: 10,
  showInactiveUsers: false,
};

export const useUserPreferencesStore = create<UserPreferencesStore>()(
  persist(
    (set, get) => ({
      ...defaultPreferences,

      updateSort: (field, direction) =>
        set({
          tableSort: { field, direction },
        }),

      updateFilters: (filters) =>
        set({
          tableFilters: { ...get().tableFilters, ...filters },
        }),

      setPageSize: (size) => set({ pageSize: size }),

      toggleInactiveUsers: () =>
        set((state) => ({
          showInactiveUsers: !state.showInactiveUsers,
        })),

      resetPreferences: () => set(defaultPreferences),
    }),
    {
      name: "user-preferences",
      partialize: (state) => ({
        tableSort: state.tableSort,
        tableFilters: state.tableFilters,
        pageSize: state.pageSize,
        showInactiveUsers: state.showInactiveUsers,
      }),
    }
  )
);
