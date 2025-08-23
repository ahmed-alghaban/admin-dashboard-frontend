import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useCategorySelectionStore, useCategoryUIStore } from "../stores";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Components
import CategoryPageHeader from "../components/CategoryPageHeader";
import CategoryStatsCards from "../components/CategoryStatsCards";
import CategoryFilters from "../components/CategoryFilters";
import CategoriesTable from "../components/CategoriesTable";
import CategoryDrawers from "../components/CategoryDrawers";

// Hooks
import { useCategoryFilters } from "../hooks/useCategoryFilters";

const CategoryPage = () => {
  const queryClient = useQueryClient();
  const { selectedCategories, clearSelection } = useCategorySelectionStore();
  const { closeAddDrawer, closeEditDrawer } = useCategoryUIStore();
  const {
    categories,
    isLoading,
    error,
    filters,
    updateFilters,
    setPage,
    totalCount,
    totalPages,
    currentPage,
    pageSize,
  } = useCategoryFilters();

  // Handle bulk operations
  const handleBulkDelete = async () => {
    if (selectedCategories.size === 0) return;
    const categoryIds = Array.from(selectedCategories);
    // You can implement bulk delete API call here
    toast.info(
      `Bulk delete ${categoryIds.length} categories (not implemented yet)`
    );
    clearSelection();
  };

  const handleBulkExport = () => {
    if (selectedCategories.size === 0) return;
    // You can implement export functionality here
    toast.info(
      `Export ${selectedCategories.size} categories (not implemented yet)`
    );
  };

  const handleAddCategorySuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    closeAddDrawer();
  };

  const handleEditCategorySuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    closeEditDrawer();
  };

  // Show full page skeleton only on initial load
  if (isLoading && !categories.length) {
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
            <Skeleton className="h-5 w-24" />
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
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-8" />
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
            Error loading categories
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
      <CategoryPageHeader
        selectedCount={selectedCategories.size}
        onBulkDelete={handleBulkDelete}
        onBulkExport={handleBulkExport}
      />

      {/* Stats Cards */}
      <CategoryStatsCards totalCategories={totalCount} isLoading={isLoading} />

      {/* Filters and Search */}
      <CategoryFilters
        filters={filters}
        onFiltersChange={updateFilters}
        isLoading={isLoading}
      />

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Categories ({totalCount})</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoriesTable
            categories={categories}
            currentPage={currentPage}
            totalCount={totalCount}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Drawers */}
      <CategoryDrawers
        onAddSuccess={handleAddCategorySuccess}
        onEditSuccess={handleEditCategorySuccess}
      />
    </div>
  );
};

export default CategoryPage;
