import { create } from "zustand";
import { useUIStore } from "@/store/ui";

// Category-specific UI state that uses global drawer management
interface CategoryUIState {
  selectedCategoryId: string | null;

  openAddDrawer: () => void;
  closeAddDrawer: () => void;
  openEditDrawer: (categoryId: string) => void;
  closeEditDrawer: () => void;
  reset: () => void;
}

export const useCategoryUIStore = create<CategoryUIState>((set) => ({
  selectedCategoryId: null,

  openAddDrawer: () => {
    useUIStore.getState().openDrawer("category-add");
  },

  closeAddDrawer: () => {
    useUIStore.getState().closeDrawer();
  },

  openEditDrawer: (categoryId: string) => {
    set({ selectedCategoryId: categoryId });
    useUIStore.getState().openDrawer("category-edit", { categoryId });
  },

  closeEditDrawer: () => {
    set({ selectedCategoryId: null });
    useUIStore.getState().closeDrawer();
  },

  reset: () => {
    set({ selectedCategoryId: null });
    useUIStore.getState().closeDrawer();
  },
}));
