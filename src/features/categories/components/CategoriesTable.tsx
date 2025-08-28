import { DataTable } from "@/components/ui/table/DataTable";
import { createColumns } from "./CategoryTableColumns";
import { useCategoryUIStore, useCategorySelectionStore } from "../stores";
import type { Category } from "../categoryTypes.ts";
import CategoryDetailModal from "./CategoryDetailModal";
import { useState } from "react";

interface CategoriesTableProps {
  categories: Category[];
  currentPage: number;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const CategoriesTable = ({
  categories,
  currentPage,
  totalCount,
  totalPages,
  pageSize,
  onPageChange,
  isLoading = false,
}: CategoriesTableProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Zustand store for UI state
  const { openEditDrawer } = useCategoryUIStore();
  const { selectedCategories, toggleSelection, selectAll } =
    useCategorySelectionStore();

  const handleEditCategory = (category: Category) => {
    openEditDrawer(category.categoryId);
  };

  const handleDeleteCategory = async (category: Category) => {
    // TODO: Implement delete functionality
    console.log("Delete category:", category.categoryId);
  };

  const handleViewDetails = (category: Category) => {
    setSelectedCategory(category);
    setIsDetailModalOpen(true);
  };

  const allCategoryIds = categories.map((category) => category.categoryId);

  const handleSelectAll = (categoryIds: string[]) => {
    if (categoryIds.length > 0) {
      selectAll(categories);
    } else {
      selectAll([]);
    }
  };

  return (
    <>
      <DataTable
        columns={createColumns(
          handleEditCategory,
          handleDeleteCategory,
          handleViewDetails,
          selectedCategories,
          toggleSelection,
          handleSelectAll,
          allCategoryIds
        )}
        data={categories}
        loading={isLoading}
        emptyMessage="No categories found."
        manualPagination={true}
        page={currentPage}
        pageSize={pageSize}
        total={totalCount}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <CategoryDetailModal
        category={selectedCategory}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        onEdit={() => {
          if (selectedCategory) {
            handleEditCategory(selectedCategory);
            setIsDetailModalOpen(false);
          }
        }}
        onDelete={() => {
          if (selectedCategory) {
            handleDeleteCategory(selectedCategory);
            setIsDetailModalOpen(false);
          }
        }}
      />
    </>
  );
};

export default CategoriesTable;
