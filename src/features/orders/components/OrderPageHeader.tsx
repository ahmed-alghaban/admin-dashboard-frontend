import { Button } from "@/components/ui/button/button";
import { Plus, Download, Trash2 } from "lucide-react";
import { exportToExcel, formatOrderDataForExport } from "@/lib/utils";
import { toast } from "sonner";
import type { Order } from "../orderTypes";
import { useOrderSelectionStore } from "../stores";

interface OrderPageHeaderProps {
  onBulkDelete?: () => void;
  onAddOrder?: () => void;
  orders: Order[];
}

const OrderPageHeader = ({
  onBulkDelete,
  onAddOrder,
  orders,
}: OrderPageHeaderProps) => {
  const { selectedOrders, getSelectedCount, clearSelection } =
    useOrderSelectionStore();

  const handleExport = () => {
    try {
      let dataToExport: Order[];
      let filename: string;

      if (selectedOrders.size > 0) {
        // Export selected orders
        dataToExport = orders.filter((order) =>
          selectedOrders.has(order.orderId)
        );
        filename = `selected-orders-${new Date().toISOString().split("T")[0]}`;
        toast.success(`${dataToExport.length} orders exported successfully!`);
      } else {
        // Export all orders
        dataToExport = orders;
        filename = `orders-${new Date().toISOString().split("T")[0]}`;
        toast.success("All orders exported successfully!");
      }

      const formattedData = formatOrderDataForExport(dataToExport);
      exportToExcel(formattedData, filename);
    } catch (error) {
      toast.error("Failed to export orders");
      console.error("Export error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track all customer orders
        </p>
      </div>
      <div className="flex items-center gap-2">
        {selectedOrders.size > 0 && (
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
          {selectedOrders.size > 0
            ? `Export Selected (${selectedOrders.size})`
            : "Export All"}
        </Button>
        <Button
          variant="outline"
          onClick={onAddOrder}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Order
        </Button>
      </div>
    </div>
  );
};

export default OrderPageHeader;
