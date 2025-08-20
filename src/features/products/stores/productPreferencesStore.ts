import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductPreferencesState {
  tableSort: Record<string, "asc" | "desc">;
  tableFilters: Record<string, string | number | boolean>;
  pageSize: number;
  showInactiveProducts: boolean;

  updateSort: (field: string, direction: "asc" | "desc") => void;
  updateFilters: (filters: Record<string, string | number | boolean>) => void;
  setPageSize: (size: number) => void;
  toggleInactiveProducts: () => void;
  resetPreferences: () => void;
}

export const useProductPreferencesStore = create<ProductPreferencesState>()(
  persist(
    (set) => ({
      tableSort: {},
      tableFilters: {},
      pageSize: 10,
      showInactiveProducts: false,

      updateSort: (field: string, direction: "asc" | "desc") => {
        set((state) => ({
          tableSort: { ...state.tableSort, [field]: direction },
        }));
      },

      updateFilters: (filters: Record<string, string | number | boolean>) => {
        set((state) => ({
          tableFilters: { ...state.tableFilters, ...filters },
        }));
      },

      setPageSize: (size: number) => {
        set({ pageSize: size });
      },

      toggleInactiveProducts: () => {
        set((state) => ({ showInactiveProducts: !state.showInactiveProducts }));
      },

      resetPreferences: () => {
        set({
          tableSort: {},
          tableFilters: {},
          pageSize: 10,
          showInactiveProducts: false,
        });
      },
    }),
    {
      name: "product-preferences",
    }
  )
);
