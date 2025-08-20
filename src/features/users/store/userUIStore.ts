import { create } from "zustand";
import { useUIStore } from "@/store/ui";

// User-specific UI state that uses global drawer management
interface UserUIState {
  selectedUserId: string | null;

  openAddDrawer: () => void;
  closeAddDrawer: () => void;
  openEditDrawer: (userId: string) => void;
  closeEditDrawer: () => void;
  reset: () => void;
}

export const useUserUIStore = create<UserUIState>((set) => ({
  selectedUserId: null,

  openAddDrawer: () => {
    useUIStore.getState().openDrawer("user-add");
  },

  closeAddDrawer: () => {
    useUIStore.getState().closeDrawer();
  },

  openEditDrawer: (userId: string) => {
    set({ selectedUserId: userId });
    useUIStore.getState().openDrawer("user-edit", { userId });
  },

  closeEditDrawer: () => {
    set({ selectedUserId: null });
    useUIStore.getState().closeDrawer();
  },

  reset: () => {
    set({ selectedUserId: null });
    useUIStore.getState().closeDrawer();
  },
}));
