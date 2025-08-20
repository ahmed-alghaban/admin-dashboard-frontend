import { create } from "zustand";

interface ProductSelectionState {
  selectedProducts: Set<string>;
  isSelectMode: boolean;

  toggleProduct: (productId: string) => void;
  selectAll: (productIds: string[]) => void;
  clearSelection: () => void;
  toggleSelectMode: () => void;
  selectProduct: (productId: string) => void;
  deselectProduct: (productId: string) => void;
  getSelectedCount: () => number;
}

export const useProductSelectionStore = create<ProductSelectionState>(
  (set, get) => ({
    selectedProducts: new Set(),
    isSelectMode: false,

    toggleProduct: (productId: string) => {
      set((state) => {
        const newSelected = new Set(state.selectedProducts);
        if (newSelected.has(productId)) {
          newSelected.delete(productId);
        } else {
          newSelected.add(productId);
        }
        return { selectedProducts: newSelected };
      });
    },

    selectAll: (productIds: string[]) => {
      set({ selectedProducts: new Set(productIds) });
    },

    clearSelection: () => {
      set({ selectedProducts: new Set() });
    },

    toggleSelectMode: () => {
      set((state) => ({ isSelectMode: !state.isSelectMode }));
    },

    selectProduct: (productId: string) => {
      set((state) => {
        const newSelected = new Set(state.selectedProducts);
        newSelected.add(productId);
        return { selectedProducts: newSelected };
      });
    },

    deselectProduct: (productId: string) => {
      set((state) => {
        const newSelected = new Set(state.selectedProducts);
        newSelected.delete(productId);
        return { selectedProducts: newSelected };
      });
    },

    getSelectedCount: () => {
      return get().selectedProducts.size;
    },
  })
);
