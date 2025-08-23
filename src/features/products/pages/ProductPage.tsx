import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useProductSelectionStore, useProductUIStore } from "../stores";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Components
import ProductPageHeader from "../components/ProductPageHeader";
import ProductStatsCards from "../components/ProductStatsCards";
import ProductFilters from "../components/ProductFilters";
import ProductsTable from "../components/ProductsTable";
import ProductDrawers from "../components/ProductDrawers";

// Hooks
import { useProductFilters } from "../hooks/useProductFilters";

const ProductPage = () => {
  const queryClient = useQueryClient();
  const { selectedProducts, clearSelection } = useProductSelectionStore();
  const { closeAddDrawer, closeEditDrawer } = useProductUIStore();
  const {
    products,
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
  } = useProductFilters();

  // Handle bulk operations
  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) return;
    const productIds = Array.from(selectedProducts);
    // You can implement bulk delete API call here
    toast.info(
      `Bulk delete ${productIds.length} products (not implemented yet)`
    );
    clearSelection();
  };

  const handleBulkExport = () => {
    if (selectedProducts.size === 0) return;
    // You can implement export functionality here
    toast.info(
      `Export ${selectedProducts.size} products (not implemented yet)`
    );
  };

  const handleAddProductSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
    closeAddDrawer();
  };

  const handleEditProductSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
    closeEditDrawer();
  };

  // Show full page skeleton only on initial load
  if (isLoading && !products.length) {
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
            Error loading products
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
      <ProductPageHeader
        onBulkDelete={handleBulkDelete}
        onBulkExport={handleBulkExport}
      />

      {/* Stats Cards */}
      <ProductStatsCards products={products || []} />

      {/* Filters and Search */}
      <ProductFilters
        filters={filters}
        onFiltersChange={updateFilters}
        onPageSizeChange={setPageSize}
        isLoading={isFetching}
      />

      {/* Products Table */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-slate-200">
            Products ({totalCount})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsTable
            products={products}
            currentPage={currentPage}
            totalCount={totalCount}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            isLoading={isFetching}
          />
        </CardContent>
      </Card>

      {/* Product Drawers for add/edit forms */}
      <ProductDrawers
        onAddSuccess={handleAddProductSuccess}
        onEditSuccess={handleEditProductSuccess}
      />
    </div>
  );
};

export default ProductPage;
