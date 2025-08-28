import { Button } from "@/components/ui/button/button";
import { useCategoryUIStore, useCategorySelectionStore } from "../stores";
import { Plus, Download, Trash2 } from "lucide-react";
import { exportToExcel, formatCategoryDataForExport } from "@/lib/utils";
import { toast } from "sonner";
import type { Category } from "../categoryTypes.ts";

interface CategoryPageHeaderProps {
  onBulkDelete: () => void;
  categories: Category[];
}

const CategoryPageHeader = ({
  onBulkDelete,
  categories,
}: CategoryPageHeaderProps) => {
  const { openAddDrawer } = useCategoryUIStore();
  const { selectedCategories, clearSelection } = useCategorySelectionStore();

  const handleExport = () => {
    try {
      let dataToExport: Category[];
      let filename: string;

      if (selectedCategories.size > 0) {
        // Export selected categories
        dataToExport = categories.filter((category) =>
          selectedCategories.has(category.categoryId)
        );
        filename = `selected-categories-${new Date().toISOString().split("T")[0]}`;
        toast.success(
          `${dataToExport.length} categories exported successfully!`
        );
      } else {
        // Export all categories
        dataToExport = categories;
        filename = `categories-${new Date().toISOString().split("T")[0]}`;
        toast.success("All categories exported successfully!");
      }

      const formattedData = formatCategoryDataForExport(dataToExport);
      exportToExcel(formattedData, filename);
    } catch (error) {
      toast.error("Failed to export categories");
      console.error("Export error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Manage your product categories and organize your inventory
        </p>
      </div>
      <div className="flex items-center gap-2">
        {selectedCategories.size > 0 && (
          <>
            <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {selectedCategories.size} selected
            </div>
            <Button variant="destructive" size="sm" onClick={onBulkDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
            <Button variant="outline" size="sm" onClick={clearSelection}>
              Clear Selection
            </Button>
          </>
        )}
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          {selectedCategories.size > 0
            ? `Export Selected (${selectedCategories.size})`
            : "Export All"}
        </Button>
        <Button variant="outline" onClick={openAddDrawer}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
    </div>
  );
};

export default CategoryPageHeader;
