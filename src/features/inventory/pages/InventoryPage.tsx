import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useInventorySelectionStore, useInventoryUIStore } from "../stores";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Components
import {
  InventoryPageHeader,
  InventoryStatsCards,
  InventoriesTable,
  InventoryDrawers,
} from "../components";

// Hooks
import { useInventoryFilters } from "../hooks/useInventoryFilters";

const InventoryPage = () => {
  const queryClient = useQueryClient();
  const { selectedInventories, clearSelection } = useInventorySelectionStore();
  const { closeEditDrawer } = useInventoryUIStore();
  const {
    inventories,
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
    pageSize,
  } = useInventoryFilters();

  // Handle bulk operations
  const handleBulkExport = () => {
    if (selectedInventories.size === 0) return;
    // You can implement export functionality here
    toast.info(
      `Export ${selectedInventories.size} inventory items (not implemented yet)`
    );
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["inventories"] });
    toast.success("Inventory data refreshed");
  };

  const handleEditInventorySuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["inventories"] });
    closeEditDrawer();
  };

  // Show full page skeleton only on initial load
  if (isLoading && !inventories.length) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
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
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-destructive mb-2">
            Error loading inventory data
          </div>
          <button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["inventories"] })
            }
            className="text-sm text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <InventoryPageHeader
        onBulkExport={handleBulkExport}
        onRefresh={handleRefresh}
      />

      <InventoryStatsCards inventories={inventories} />

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <InventoriesTable
            inventories={inventories}
            currentPage={currentPage}
            totalCount={totalCount}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            isLoading={isFetching}
          />
        </CardContent>
      </Card>

      <InventoryDrawers onEditSuccess={handleEditInventorySuccess} />
    </div>
  );
};

export default InventoryPage;
