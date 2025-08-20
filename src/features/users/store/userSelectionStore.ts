import { create } from "zustand";

interface UserSelectionState {
  selectedUsers: Set<string>;
  isSelectMode: boolean;

  toggleUser: (userId: string) => void;
  selectAll: (userIds: string[]) => void;
  clearSelection: () => void;
  toggleSelectMode: () => void;
  selectUser: (userId: string) => void;
  deselectUser: (userId: string) => void;
  getSelectedCount: () => number;
}

export const useUserSelectionStore = create<UserSelectionState>((set, get) => ({
  selectedUsers: new Set(),
  isSelectMode: false,

  toggleUser: (userId: string) =>
    set((state) => {
      const newSelectedUsers = new Set(state.selectedUsers);
      if (newSelectedUsers.has(userId)) {
        newSelectedUsers.delete(userId);
      } else {
        newSelectedUsers.add(userId);
      }
      return { selectedUsers: newSelectedUsers };
    }),

  selectAll: (userIds: string[]) => set({ selectedUsers: new Set(userIds) }),

  clearSelection: () => set({ selectedUsers: new Set() }),

  toggleSelectMode: () =>
    set((state) => ({
      isSelectMode: !state.isSelectMode,
      selectedUsers: new Set(), // Clear selection when toggling mode
    })),

  selectUser: (userId: string) =>
    set((state) => {
      const newSelectedUsers = new Set(state.selectedUsers);
      newSelectedUsers.add(userId);
      return { selectedUsers: newSelectedUsers };
    }),

  deselectUser: (userId: string) =>
    set((state) => {
      const newSelectedUsers = new Set(state.selectedUsers);
      newSelectedUsers.delete(userId);
      return { selectedUsers: newSelectedUsers };
    }),

  getSelectedCount: () => get().selectedUsers.size,
}));
