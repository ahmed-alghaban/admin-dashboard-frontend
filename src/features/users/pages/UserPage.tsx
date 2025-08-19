import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { useUsers } from "../hooks/useUser";
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
  const { data: users, error } = useUsers();
  const queryClient = useQueryClient();
  const { selectedUsers, clearSelection } = useUserSelectionStore();
  const { closeAddDrawer, closeEditDrawer } = useUserUIStore();
  const { filteredUsers, updateFilters } = useUserFilters(users);

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
      <UserFilters onFiltersChange={updateFilters} />

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <UsersTable />
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
