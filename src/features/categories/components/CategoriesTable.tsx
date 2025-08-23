import { DataTable } from "@/components/ui/table/DataTable";
import { createColumns } from "./CategoryTableColumns";
import { useCategoryUIStore } from "../stores";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import type { Category } from "../categoryTypes";
import { toast } from "sonner";

interface CategoriesTableProps {
  categories: Category[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const CategoriesTable = ({
  categories,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: CategoriesTableProps) => {
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

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
      } catch (error) {
        toast.error(`Failed to delete category "${category.name}"`);
      }
    }
  };

  return (
    <DataTable
      columns={createColumns(handleEditCategory, handleDeleteCategory)}
      data={categories}
      loading={isLoading || isDeleting}
      emptyMessage="No categories found."
      manualPagination={true}
      page={currentPage}
      total={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default CategoriesTable;
