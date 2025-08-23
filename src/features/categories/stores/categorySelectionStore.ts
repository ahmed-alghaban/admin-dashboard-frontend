import { create } from "zustand";
import type { Category } from "../categoryTypes";

interface CategorySelectionState {
  selectedCategories: Set<string>;
  isAllSelected: boolean;

  toggleSelection: (categoryId: string) => void;
  selectAll: (categories: Category[]) => void;
  clearSelection: () => void;
  setSelection: (categoryIds: string[]) => void;
}

export const useCategorySelectionStore = create<CategorySelectionState>(
  (set, get) => ({
    selectedCategories: new Set(),
    isAllSelected: false,

    toggleSelection: (categoryId: string) => {
      set((state) => {
        const newSelection = new Set(state.selectedCategories);
        if (newSelection.has(categoryId)) {
          newSelection.delete(categoryId);
        } else {
          newSelection.add(categoryId);
        }
        return {
          selectedCategories: newSelection,
          isAllSelected: false,
        };
      });
    },

    selectAll: (categories: Category[]) => {
      set((state) => {
        const newIsAllSelected = !state.isAllSelected;
        const newSelection = new Set<string>();

        if (newIsAllSelected) {
          categories.forEach((category) => {
            newSelection.add(category.categoryId);
          });
        }

        return {
          selectedCategories: newSelection,
          isAllSelected: newIsAllSelected,
        };
      });
    },

    clearSelection: () => {
      set({
        selectedCategories: new Set(),
        isAllSelected: false,
      });
    },

    setSelection: (categoryIds: string[]) => {
      set({
        selectedCategories: new Set(categoryIds),
        isAllSelected: false,
      });
    },
  })
);
