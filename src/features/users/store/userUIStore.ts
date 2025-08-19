import { create } from "zustand";
import type { UserUIStore } from "../userTypes";
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
