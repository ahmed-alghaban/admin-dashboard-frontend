import { DataTable } from "@/components/ui/table/DataTable";
import { createColumns } from "./OrderTableColumns";
import { useOrderUIStore } from "../stores";
import type { Order } from "../orderTypes";
import OrderDetailModal from "./OrderDetailModal";
import { useState } from "react";

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleEditOrder = (order: Order) => {
    openEditDrawer(order.orderId);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <DataTable
        columns={createColumns(handleEditOrder, handleViewDetails)}
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

      <OrderDetailModal
        order={selectedOrder}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        onEdit={() => {
          if (selectedOrder) {
            handleEditOrder(selectedOrder);
            setIsDetailModalOpen(false);
          }
        }}
      />
    </>
  );
};

export default OrdersTable;
