import { Button } from "@/components/ui/button/button";
import { Download, RefreshCw } from "lucide-react";
import { useInventorySelectionStore } from "../stores";

interface InventoryPageHeaderProps {
  onBulkExport: () => void;
  onRefresh: () => void;
}

const InventoryPageHeader = ({
  onBulkExport,
  onRefresh,
}: InventoryPageHeaderProps) => {
  const { selectedInventories } = useInventorySelectionStore();

  const selectedCount = selectedInventories.size;

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground">
          Manage your inventory levels and stock quantities
        </p>
      </div>
      <div className="flex items-center gap-2">
        {selectedCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkExport}
            className="hidden sm:flex"
          >
            <Download className="mr-2 h-4 w-4" />
            Export ({selectedCount})
          </Button>
        )}
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default InventoryPageHeader;
