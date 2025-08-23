import { DataTable } from "@/components/ui/table/DataTable";
import { createColumns } from "./OrderTableColumns";
import { useOrderUIStore } from "../stores";
import type { Order } from "../orderTypes";

interface OrdersTableProps {
  orders: Order[];
  currentPage: number;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const OrdersTable = ({
  orders,
  currentPage,
  totalCount,
  totalPages,
  pageSize,
  onPageChange,
  isLoading = false,
}: OrdersTableProps) => {
  // Zustand store for UI state
  const { openEditDrawer } = useOrderUIStore();

  const handleEditOrder = (order: Order) => {
    openEditDrawer(order.orderId);
  };

  return (
    <DataTable
      columns={createColumns(handleEditOrder)}
      data={orders}
      loading={isLoading}
      emptyMessage="No orders found."
      manualPagination={true}
      page={currentPage}
      pageSize={pageSize}
      total={totalCount}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default OrdersTable;
