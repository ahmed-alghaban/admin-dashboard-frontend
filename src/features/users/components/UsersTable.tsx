import { DataTable } from "@/components/ui/table/DataTable";
import { createColumns } from "./UserTableColumns";
import { useUserUIStore } from "../store";
import type { User } from "../userTypes";
import { useDeleteUser } from "../hooks/useDeleteUser";

interface UsersTableProps {
  users: User[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const UsersTable = ({
  users,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: UsersTableProps) => {
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  // Zustand store for UI state
  const { openEditDrawer } = useUserUIStore();

  const handleEditUser = (user: User) => {
    openEditDrawer(user.userId);
  };

  const handleDeleteUser = async (user: User) => {
    await deleteUser(user.userId);
  };

  return (
    <DataTable
      columns={createColumns(handleEditUser, handleDeleteUser)}
      data={users}
      loading={isLoading || isDeleting}
      emptyMessage="No users found."
      manualPagination={true}
      page={currentPage}
      total={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default UsersTable;
