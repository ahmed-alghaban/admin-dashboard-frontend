import { Button } from "@/components/ui/button/button";
import { Plus, Download, Trash2 } from "lucide-react";
import { useProductUIStore, useProductSelectionStore } from "../stores";

interface ProductPageHeaderProps {
  onBulkDelete: () => void;
  onBulkExport: () => void;
}

const ProductPageHeader = ({
  onBulkDelete,
  onBulkExport,
}: ProductPageHeaderProps) => {
  const { openAddDrawer } = useProductUIStore();
  const { selectedProducts, getSelectedCount, clearSelection } =
    useProductSelectionStore();

  const selectedCount = getSelectedCount();

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          Manage your product inventory and catalog
        </p>
      </div>
      <div className="flex items-center gap-2">
        {selectedCount > 0 && (
          <>
            <span className="text-sm text-muted-foreground">
              {selectedCount} selected
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkExport}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onBulkDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
            <Button variant="ghost" size="sm" onClick={clearSelection}>
              Clear
            </Button>
          </>
        )}
        <Button onClick={openAddDrawer} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default ProductPageHeader;
