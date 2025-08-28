import { DataTable } from "@/components/ui/table/DataTable";
import { createColumns } from "./OrderTableColumns";
import { useOrderUIStore, useOrderSelectionStore } from "../stores";
import type { Order } from "../orderTypes.ts";
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Zustand store for UI state
  const { openEditDrawer } = useOrderUIStore();
  const { selectedOrders, toggleOrder, selectAll } = useOrderSelectionStore();

  const handleEditOrder = (order: Order) => {
    openEditDrawer(order.orderId);
  };

  const handleDeleteOrder = async (order: Order) => {
    // TODO: Implement delete functionality
    console.log("Delete order:", order.orderId);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const allOrderIds = orders.map((order) => order.orderId);

  return (
    <>
      <DataTable
        columns={createColumns(
          handleEditOrder,
          handleDeleteOrder,
          handleViewDetails,
          selectedOrders,
          toggleOrder,
          selectAll,
          allOrderIds
        )}
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
        onDelete={() => {
          if (selectedOrder) {
            handleDeleteOrder(selectedOrder);
            setIsDetailModalOpen(false);
          }
        }}
      />
    </>
  );
};

export default OrdersTable;
