import { DataTable } from "@/components/ui/table/DataTable";
import { useUsers } from "../hooks/useUser";
import { createColumns } from "./UserTableColumns";
import { SideDrawer } from "@/components/ui/sheet/SideDrawer";
import { UserCreateForm } from "./UserCreateForm";
import UserEditForm from "./UserEditForm";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button/button";
import { Plus } from "lucide-react";
import type { User } from "../userTypes";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useUserUIStore } from "../store/userUIStore";

const UsersTable = () => {
  const { data: users, isLoading, error } = useUsers();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const queryClient = useQueryClient();

  // Zustand store for UI state
  const {
    isAddDrawerOpen,
    isEditDrawerOpen,
    selectedUserId,
    openAddDrawer,
    closeAddDrawer,
    openEditDrawer,
    closeEditDrawer,
  } = useUserUIStore();

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

  const handleAddUserSuccess = () => {
    closeAddDrawer();
    queryClient.invalidateQueries({ queryKey: ["users"] });
    toast.success("User added successfully!");
  };

  const handleAddUserCancel = () => {
    closeAddDrawer();
  };

  const handleEditUser = (user: User) => {
    openEditDrawer(user.userId);
  };

  const handleEditUserSuccess = () => {
    closeEditDrawer();
    queryClient.invalidateQueries({ queryKey: ["users"] });
    toast.success("User updated successfully!");
  };

  const handleDeleteUser = async (user: User) => {
    await deleteUser(user.userId);
  };

  const handleEditUserCancel = () => {
    closeEditDrawer();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage your users and their permissions
          </p>
        </div>
        <Button onClick={openAddDrawer}>
          <Plus className="mr-1 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="bg-card">
        <DataTable
          columns={createColumns(handleEditUser, handleDeleteUser)}
          data={users || []}
          loading={isLoading || isDeleting}
          emptyMessage="No users found."
        />
      </div>

      <SideDrawer
        open={isAddDrawerOpen}
        onOpenChange={(open) => !open && closeAddDrawer()}
        title="Add New User"
        description="Create a new user account"
        side="right"
        widthClassName="w-full sm:max-w-2xl"
      >
        <UserCreateForm
          onSuccess={handleAddUserSuccess}
          onCancel={handleAddUserCancel}
        />
      </SideDrawer>

      <SideDrawer
        open={isEditDrawerOpen}
        onOpenChange={(open) => !open && closeEditDrawer()}
        title="Edit User"
        description="Update user information"
        side="right"
        widthClassName="w-full sm:max-w-2xl"
      >
        {selectedUserId && (
          <UserEditForm
            userId={selectedUserId}
            onSuccess={handleEditUserSuccess}
            onCancel={handleEditUserCancel}
          />
        )}
      </SideDrawer>
    </div>
  );
};

export default UsersTable;
