import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useUserSelectionStore, useUserUIStore } from "../store";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Components
import {
  UserPageHeader,
  UserStatsCards,
  UserFilters,
  UserDrawers,
  UsersTable,
} from "../components";

// Hooks
import { useUserFilters } from "../hooks/useUserFilters";

const UserPage = () => {
  const queryClient = useQueryClient();
  const { selectedUsers, clearSelection } = useUserSelectionStore();
  const { closeAddDrawer, closeEditDrawer } = useUserUIStore();
  const {
    users,
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
  } = useUserFilters();

  // Handle bulk operations
  const handleBulkDelete = async () => {
    if (selectedUsers.size === 0) return;
    const userIds = Array.from(selectedUsers);
    // You can implement bulk delete API call here
    toast.info(`Bulk delete ${userIds.length} users (not implemented yet)`);
    clearSelection();
  };

  const handleBulkExport = () => {
    if (selectedUsers.size === 0) return;
    // You can implement export functionality here
    toast.info(`Export ${selectedUsers.size} users (not implemented yet)`);
  };

  const handleAddUserSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    toast.success("User added successfully!");
    closeAddDrawer();
  };

  const handleEditUserSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    toast.success("User updated successfully!");
    closeEditDrawer();
  };

  // Show full page skeleton only on initial load
  if (isLoading && !users.length) {
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
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-destructive text-lg font-medium">
            Error loading users
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <UserPageHeader
        onBulkDelete={handleBulkDelete}
        onBulkExport={handleBulkExport}
      />

      {/* Stats Cards */}
      <UserStatsCards users={users || []} />

      {/* Filters and Search */}
      <UserFilters
        filters={filters}
        onFiltersChange={updateFilters}
        onPageSizeChange={setPageSize}
        isLoading={isFetching}
      />

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({totalCount})</CardTitle>
        </CardHeader>
        <CardContent>
          <UsersTable
            users={users}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            isLoading={isFetching}
          />
        </CardContent>
      </Card>

      {/* Drawers */}
      <UserDrawers
        onAddSuccess={handleAddUserSuccess}
        onEditSuccess={handleEditUserSuccess}
      />
    </div>
  );
};

export default UserPage;
