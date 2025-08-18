import { create } from "zustand";

interface UserUIStore {
  // Drawer states
  isAddDrawerOpen: boolean;
  isEditDrawerOpen: boolean;
  selectedUserId: string | null;

  // Actions
  openAddDrawer: () => void;
  closeAddDrawer: () => void;
  openEditDrawer: (userId: string) => void;
  closeEditDrawer: () => void;
  reset: () => void;
}

export const useUserUIStore = create<UserUIStore>((set) => ({
  isAddDrawerOpen: false,
  isEditDrawerOpen: false,
  selectedUserId: null,

  openAddDrawer: () => set({ isAddDrawerOpen: true }),
  closeAddDrawer: () => set({ isAddDrawerOpen: false }),
  openEditDrawer: (userId) =>
    set({
      isEditDrawerOpen: true,
      selectedUserId: userId,
    }),
  closeEditDrawer: () =>
    set({
      isEditDrawerOpen: false,
      selectedUserId: null,
    }),
  reset: () =>
    set({
      isAddDrawerOpen: false,
      isEditDrawerOpen: false,
      selectedUserId: null,
    }),
}));
