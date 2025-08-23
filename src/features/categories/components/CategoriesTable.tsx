import { DataTable } from "@/components/ui/table/DataTable";
import { createColumns } from "./CategoryTableColumns";
import { useCategoryUIStore } from "../stores";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import type { Category } from "../categoryTypes";
import { toast } from "sonner";
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
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Zustand store for UI state
  const { openEditDrawer } = useCategoryUIStore();

  const handleEditCategory = (category: Category) => {
    openEditDrawer(category.categoryId);
  };

  const handleDeleteCategory = async (category: Category) => {
    if (
      window.confirm(
        `Are you sure you want to delete the category "${category.name}"? This action cannot be undone.`
      )
    ) {
      try {
        await deleteCategory(category.categoryId);
        toast.success(
          `Category "${category.name}" has been deleted successfully`
        );
      } catch {
        toast.error(`Failed to delete category "${category.name}"`);
      }
    }
  };

  const handleViewDetails = (category: Category) => {
    setSelectedCategory(category);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <DataTable
        columns={createColumns(
          handleEditCategory,
          handleDeleteCategory,
          handleViewDetails
        )}
        data={categories}
        loading={isLoading || isDeleting}
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
