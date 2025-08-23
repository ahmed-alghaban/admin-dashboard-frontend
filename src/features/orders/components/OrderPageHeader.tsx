import { Button } from "@/components/ui/button/button";
import { Package, Plus, Download, Trash2 } from "lucide-react";

interface OrderPageHeaderProps {
  selectedCount?: number;
  onBulkDelete?: () => void;
  onBulkExport?: () => void;
  onAddOrder?: () => void;
}

const OrderPageHeader = ({
  selectedCount = 0,
  onBulkDelete,
  onBulkExport,
  onAddOrder,
}: OrderPageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track all customer orders
        </p>
      </div>
      <div className="flex items-center gap-2">
        {selectedCount > 0 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkExport}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export ({selectedCount})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkDelete}
              className="flex items-center gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Delete ({selectedCount})
            </Button>
          </>
        )}
        <Button onClick={onAddOrder} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Order
        </Button>
      </div>
    </div>
  );
};

export default OrderPageHeader;
