import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrderPreferencesState {
  tableSort: Record<string, "asc" | "desc">;
  tableFilters: Record<string, string | number | boolean>;
  pageSize: number;
  showCancelledOrders: boolean;

  updateSort: (field: string, direction: "asc" | "desc") => void;
  updateFilters: (filters: Record<string, string | number | boolean>) => void;
  setPageSize: (size: number) => void;
  toggleCancelledOrders: () => void;
  resetPreferences: () => void;
}

export const useOrderPreferencesStore = create<OrderPreferencesState>()(
  persist(
    (set) => ({
      tableSort: {},
      tableFilters: {},
      pageSize: 10,
      showCancelledOrders: false,

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

      toggleCancelledOrders: () => {
        set((state) => ({ showCancelledOrders: !state.showCancelledOrders }));
      },

      resetPreferences: () => {
        set({
          tableSort: {},
          tableFilters: {},
          pageSize: 10,
          showCancelledOrders: false,
        });
      },
    }),
    {
      name: "order-preferences",
    }
  )
);
