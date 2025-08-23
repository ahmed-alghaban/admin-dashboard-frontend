import { create } from "zustand";

interface RoleUIState {
  // UI states
  isAddDrawerOpen: boolean;
  isEditDrawerOpen: boolean;
  selectedRoleId: string | null;

  // Actions
  openAddDrawer: () => void;
  closeAddDrawer: () => void;
  openEditDrawer: (roleId: string) => void;
  closeEditDrawer: () => void;
  setSelectedRoleId: (roleId: string | null) => void;
}

export const useRoleUIStore = create<RoleUIState>((set) => ({
  // Initial state
  isAddDrawerOpen: false,
  isEditDrawerOpen: false,
  selectedRoleId: null,

  // Actions
  openAddDrawer: () => set({ isAddDrawerOpen: true }),
  closeAddDrawer: () => set({ isAddDrawerOpen: false }),
  openEditDrawer: (roleId: string) =>
    set({ isEditDrawerOpen: true, selectedRoleId: roleId }),
  closeEditDrawer: () => set({ isEditDrawerOpen: false, selectedRoleId: null }),
  setSelectedRoleId: (roleId: string | null) => set({ selectedRoleId: roleId }),
}));
