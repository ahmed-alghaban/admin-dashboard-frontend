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

interface UserPreferencesState extends UserPreferences {
  updateSort: (field: string, direction: "asc" | "desc") => void;
  updateFilters: (filters: Record<string, string | number | boolean>) => void;
  setPageSize: (size: number) => void;
  toggleInactiveUsers: () => void;
  resetPreferences: () => void;
}

const defaultUserPreferences: UserPreferences = {
  tableSort: {
    field: "createdAt",
    direction: "desc",
  },
  tableFilters: {},
  pageSize: 10,
  showInactiveUsers: false,
};

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set, get) => ({
      ...defaultUserPreferences,

      updateSort: (field: string, direction: "asc" | "desc") =>
        set({
          tableSort: { field, direction },
        }),

      updateFilters: (filters: Record<string, string | number | boolean>) =>
        set({
          tableFilters: { ...get().tableFilters, ...filters },
        }),

      setPageSize: (size: number) => set({ pageSize: size }),

      toggleInactiveUsers: () =>
        set((state) => ({
          showInactiveUsers: !state.showInactiveUsers,
        })),

      resetPreferences: () => set(defaultUserPreferences),
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
