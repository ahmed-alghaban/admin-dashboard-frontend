import { create } from "zustand";

interface OrderSelectionState {
  selectedOrders: Set<string>;
  isSelectMode: boolean;

  toggleOrder: (orderId: string) => void;
  selectAll: (orderIds: string[]) => void;
  clearSelection: () => void;
  toggleSelectMode: () => void;
  selectOrder: (orderId: string) => void;
  deselectOrder: (orderId: string) => void;
  getSelectedCount: () => number;
}

export const useOrderSelectionStore = create<OrderSelectionState>(
  (set, get) => ({
    selectedOrders: new Set(),
    isSelectMode: false,

    toggleOrder: (orderId: string) => {
      set((state) => {
        const newSelectedOrders = new Set(state.selectedOrders);
        if (newSelectedOrders.has(orderId)) {
          newSelectedOrders.delete(orderId);
        } else {
          newSelectedOrders.add(orderId);
        }
        return { selectedOrders: newSelectedOrders };
      });
    },

    selectAll: (orderIds: string[]) => {
      set({ selectedOrders: new Set(orderIds) });
    },

    clearSelection: () => {
      set({ selectedOrders: new Set() });
    },

    toggleSelectMode: () => {
      set((state) => ({ isSelectMode: !state.isSelectMode }));
    },

    selectOrder: (orderId: string) => {
      set((state) => {
        const newSelectedOrders = new Set(state.selectedOrders);
        newSelectedOrders.add(orderId);
        return { selectedOrders: newSelectedOrders };
      });
    },

    deselectOrder: (orderId: string) => {
      set((state) => {
        const newSelectedOrders = new Set(state.selectedOrders);
        newSelectedOrders.delete(orderId);
        return { selectedOrders: newSelectedOrders };
      });
    },

    getSelectedCount: () => {
      return get().selectedOrders.size;
    },
  })
);
