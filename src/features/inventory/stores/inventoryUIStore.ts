import { create } from "zustand";

interface InventoryUIState {
  isEditDrawerOpen: boolean;
  selectedInventoryId: string | null;
  selectedInventory: any | null;

  // Actions
  openEditDrawer: (inventory: any) => void;
  closeEditDrawer: () => void;
}

export const useInventoryUIStore = create<InventoryUIState>((set) => ({
  isEditDrawerOpen: false,
  selectedInventoryId: null,
  selectedInventory: null,

  openEditDrawer: (inventory) =>
    set({
      isEditDrawerOpen: true,
      selectedInventoryId: inventory.inventoryId,
      selectedInventory: inventory,
    }),

  closeEditDrawer: () =>
    set({
      isEditDrawerOpen: false,
      selectedInventoryId: null,
      selectedInventory: null,
    }),
}));
