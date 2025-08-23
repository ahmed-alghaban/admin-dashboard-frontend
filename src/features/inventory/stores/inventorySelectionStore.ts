import { create } from "zustand";

interface InventorySelectionState {
  selectedInventories: Set<string>;
  isSelectMode: boolean;

  // Actions
  toggleInventory: (id: string) => void;
  selectAll: (inventoryIds: string[]) => void;
  clearSelection: () => void;
  setSelectMode: (mode: boolean) => void;
}

export const useInventorySelectionStore = create<InventorySelectionState>(
  (set, get) => ({
    selectedInventories: new Set(),
    isSelectMode: false,

    toggleInventory: (id) =>
      set((state) => {
        const newSelected = new Set(state.selectedInventories);
        if (newSelected.has(id)) {
          newSelected.delete(id);
        } else {
          newSelected.add(id);
        }
        return { selectedInventories: newSelected };
      }),

    selectAll: (inventoryIds) =>
      set((state) => {
        const newSelected = new Set(inventoryIds);
        return { selectedInventories: newSelected };
      }),

    clearSelection: () =>
      set({ selectedInventories: new Set(), isSelectMode: false }),

    setSelectMode: (mode) => set({ isSelectMode: mode }),
  })
);
