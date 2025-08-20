import { create } from "zustand";
import { useUIStore } from "@/store/ui";

interface ProductUIState {
  selectedProductId: string | null;

  openAddDrawer: () => void;
  closeAddDrawer: () => void;
  openEditDrawer: (productId: string) => void;
  closeEditDrawer: () => void;
  reset: () => void;
}

export const useProductUIStore = create<ProductUIState>((set) => ({
  selectedProductId: null,

  openAddDrawer: () => {
    useUIStore.getState().openDrawer("product-add");
  },

  closeAddDrawer: () => {
    useUIStore.getState().closeDrawer();
  },

  openEditDrawer: (productId: string) => {
    set({ selectedProductId: productId });
    useUIStore.getState().openDrawer("product-edit", { productId });
  },

  closeEditDrawer: () => {
    set({ selectedProductId: null });
    useUIStore.getState().closeDrawer();
  },

  reset: () => {
    set({ selectedProductId: null });
    useUIStore.getState().closeDrawer();
  },
}));
