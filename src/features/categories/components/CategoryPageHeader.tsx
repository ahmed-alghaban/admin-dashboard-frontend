import { Button } from "@/components/ui/button/button";
import { useCategoryUIStore } from "../stores/categoryUIStore";
import { Plus, Download, Trash2 } from "lucide-react";

interface CategoryPageHeaderProps {
  selectedCount: number;
  onBulkDelete: () => void;
  onBulkExport: () => void;
}

const CategoryPageHeader = ({
  selectedCount,
  onBulkDelete,
  onBulkExport,
}: CategoryPageHeaderProps) => {
  const { openAddDrawer } = useCategoryUIStore();

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Manage your product categories and organize your inventory
        </p>
      </div>
      <div className="flex items-center gap-2">
        {selectedCount > 0 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkExport}
              className="hidden sm:flex"
            >
              <Download className="mr-2 h-4 w-4" />
              Export ({selectedCount})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkDelete}
              className="hidden sm:flex"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete ({selectedCount})
            </Button>
          </>
        )}
        <Button onClick={openAddDrawer}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
    </div>
  );
};

export default CategoryPageHeader;
