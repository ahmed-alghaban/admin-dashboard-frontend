import { DataTable } from "@/components/ui/table/DataTable";
import { useUsers } from "../hooks/useUser";
import { createColumns } from "./UserTableColumns";
import { useUserUIStore } from "../store";
import type { User } from "../userTypes";
import { useDeleteUser } from "../hooks/useDeleteUser";

const UsersTable = () => {
  const { data: users, isLoading, error } = useUsers();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  // Zustand store for UI state
  const { openEditDrawer } = useUserUIStore();

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
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

  const handleEditUser = (user: User) => {
    openEditDrawer(user.userId);
  };

  const handleDeleteUser = async (user: User) => {
    await deleteUser(user.userId);
  };

  return (
    <DataTable
      columns={createColumns(handleEditUser, handleDeleteUser)}
      data={users || []}
      loading={isLoading || isDeleting}
      emptyMessage="No users found."
    />
  );
};

export default UsersTable;