import { create } from "zustand";

interface UserSelectionStore {
  selectedUsers: Set<string>;
  isSelectMode: boolean;

  // Actions
  toggleUser: (userId: string) => void;
  selectAll: (userIds: string[]) => void;
  clearSelection: () => void;
  toggleSelectMode: () => void;
  selectUser: (userId: string) => void;
  deselectUser: (userId: string) => void;
  getSelectedCount: () => number;
}

export const useUserSelectionStore = create<UserSelectionStore>((set, get) => ({
  selectedUsers: new Set(),
  isSelectMode: false,

  toggleUser: (userId) =>
    set((state) => {
      const newSelectedUsers = new Set(state.selectedUsers);
      if (newSelectedUsers.has(userId)) {
        newSelectedUsers.delete(userId);
      } else {
        newSelectedUsers.add(userId);
      }
      return { selectedUsers: newSelectedUsers };
    }),

  selectAll: (userIds) => set({ selectedUsers: new Set(userIds) }),

  clearSelection: () => set({ selectedUsers: new Set() }),

  toggleSelectMode: () =>
    set((state) => ({
      isSelectMode: !state.isSelectMode,
      selectedUsers: new Set(), // Clear selection when toggling mode
    })),

  selectUser: (userId) =>
    set((state) => {
      const newSelectedUsers = new Set(state.selectedUsers);
      newSelectedUsers.add(userId);
      return { selectedUsers: newSelectedUsers };
    }),

  deselectUser: (userId) =>
    set((state) => {
      const newSelectedUsers = new Set(state.selectedUsers);
      newSelectedUsers.delete(userId);
      return { selectedUsers: newSelectedUsers };
    }),

  getSelectedCount: () => get().selectedUsers.size,
}));
