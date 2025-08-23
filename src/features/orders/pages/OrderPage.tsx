import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useOrderSelectionStore, useOrderUIStore } from "../stores";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Components
import {
  OrderPageHeader,
  OrderStatsCards,
  OrderFilters,
  OrderDrawers,
  OrdersTable,
} from "../components";

// Hooks
import { useOrderFilters } from "../hooks/useOrderFilters";

const OrderPage = () => {
  const queryClient = useQueryClient();
  const { selectedOrders, clearSelection } = useOrderSelectionStore();
  const { openAddDrawer, closeAddDrawer, closeEditDrawer } = useOrderUIStore();
  const {
    orders,
    isLoading,
    isFetching,
    error,
    filters,
    updateFilters,
    setPage,
    setPageSize,
    totalCount,
    totalPages,
    currentPage,
  } = useOrderFilters();

  // Handle bulk operations
  const handleBulkDelete = async () => {
    if (selectedOrders.size === 0) return;
    const orderIds = Array.from(selectedOrders);
    // You can implement bulk delete API call here
    toast.info(`Bulk delete ${orderIds.length} orders (not implemented yet)`);
    clearSelection();
  };

  const handleBulkExport = () => {
    if (selectedOrders.size === 0) return;
    // You can implement export functionality here
    toast.info(`Export ${selectedOrders.size} orders (not implemented yet)`);
  };

  const handleAddOrderSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    closeAddDrawer();
  };

  const handleEditOrderSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    closeEditDrawer();
  };

  const handleAddOrder = () => {
    openAddDrawer();
  };

  // Show full page skeleton only on initial load
  if (isLoading && !orders.length) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-24" />
            </div>
          </CardContent>
        </Card>

        {/* Table Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <div className="text-destructive text-xl font-semibold">
            Error loading orders
          </div>
          <div className="text-sm text-muted-foreground max-w-md">
            {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <OrderPageHeader
        selectedCount={selectedOrders.size}
        onBulkDelete={handleBulkDelete}
        onBulkExport={handleBulkExport}
        onAddOrder={handleAddOrder}
      />

      {/* Stats Cards */}
      <OrderStatsCards orders={orders || []} />

      {/* Filters and Search */}
      <OrderFilters
        filters={filters}
        onFiltersChange={updateFilters}
        onPageSizeChange={setPageSize}
        isLoading={isFetching}
      />

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({totalCount})</CardTitle>
        </CardHeader>
        <CardContent>
          <OrdersTable
            orders={orders}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            isLoading={isFetching}
          />
        </CardContent>
      </Card>

      {/* Drawers */}
      <OrderDrawers
        onAddSuccess={handleAddOrderSuccess}
        onEditSuccess={handleEditOrderSuccess}
      />
    </div>
  );
};

export default OrderPage;
