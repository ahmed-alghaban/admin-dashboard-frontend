import { create } from "zustand";
import { useUIStore } from "@/store/ui";

interface OrderUIState {
  selectedOrderId: string | null;

  openAddDrawer: () => void;
  closeAddDrawer: () => void;
  openEditDrawer: (orderId: string) => void;
  closeEditDrawer: () => void;
  reset: () => void;
}

export const useOrderUIStore = create<OrderUIState>((set) => ({
  selectedOrderId: null,

  openAddDrawer: () => {
    const { openDrawer } = useUIStore.getState();
    openDrawer("add-order");
    set({ selectedOrderId: null });
  },

  closeAddDrawer: () => {
    const { closeDrawer } = useUIStore.getState();
    closeDrawer();
    set({ selectedOrderId: null });
  },

  openEditDrawer: (orderId: string) => {
    const { openDrawer } = useUIStore.getState();
    openDrawer("edit-order");
    set({ selectedOrderId: orderId });
  },

  closeEditDrawer: () => {
    const { closeDrawer } = useUIStore.getState();
    closeDrawer();
    set({ selectedOrderId: null });
  },

  reset: () => {
    set({ selectedOrderId: null });
  },
}));
