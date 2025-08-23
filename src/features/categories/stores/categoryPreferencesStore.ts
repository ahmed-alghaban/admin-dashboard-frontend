import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CategoryPreferencesState {
  pageSize: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  viewMode: "table" | "grid";

  setPageSize: (pageSize: number) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: "asc" | "desc") => void;
  setViewMode: (viewMode: "table" | "grid") => void;
  reset: () => void;
}

const defaultPreferences = {
  pageSize: 10,
  sortBy: "name",
  sortOrder: "asc" as const,
  viewMode: "table" as const,
};

export const useCategoryPreferencesStore = create<CategoryPreferencesState>()(
  persist(
    (set) => ({
      ...defaultPreferences,

      setPageSize: (pageSize: number) => set({ pageSize }),
      setSortBy: (sortBy: string) => set({ sortBy }),
      setSortOrder: (sortOrder: "asc" | "desc") => set({ sortOrder }),
      setViewMode: (viewMode: "table" | "grid") => set({ viewMode }),
      reset: () => set(defaultPreferences),
    }),
    {
      name: "category-preferences",
    }
  )
);
