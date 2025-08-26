import { Button } from "@/components/ui/button/button";
import { Plus, Download, Trash2 } from "lucide-react";
import { useProductUIStore, useProductSelectionStore } from "../stores";
import { exportToExcel, formatProductDataForExport } from "@/lib/utils";
import { toast } from "sonner";
import type { Product } from "../productTypes";

interface ProductPageHeaderProps {
  onBulkDelete: () => void;
  products: Product[];
}

const ProductPageHeader = ({
  onBulkDelete,
  products,
}: ProductPageHeaderProps) => {
  const { openAddDrawer } = useProductUIStore();
  const { selectedProducts, getSelectedCount, clearSelection } =
    useProductSelectionStore();

  const handleExport = () => {
    try {
      let dataToExport: Product[];
      let filename: string;

      if (selectedProducts.size > 0) {
        // Export selected products
        dataToExport = products.filter((product) =>
          selectedProducts.has(product.productId)
        );
        filename = `selected-products-${new Date().toISOString().split("T")[0]}`;
        toast.success(`${dataToExport.length} products exported successfully!`);
      } else {
        // Export all products
        dataToExport = products;
        filename = `products-${new Date().toISOString().split("T")[0]}`;
        toast.success("All products exported successfully!");
      }

      const formattedData = formatProductDataForExport(dataToExport);
      exportToExcel(formattedData, filename);
    } catch (error) {
      toast.error("Failed to export products");
      console.error("Export error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          Manage your product inventory and catalog
        </p>
      </div>
      <div className="flex items-center gap-2">
        {selectedProducts.size > 0 && (
          <>
            <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {getSelectedCount()} selected
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
          {selectedProducts.size > 0
            ? `Export Selected (${selectedProducts.size})`
            : "Export All"}
        </Button>
        <Button variant="outline" onClick={openAddDrawer}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default ProductPageHeader;
