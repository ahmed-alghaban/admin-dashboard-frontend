import { DataTable } from "@/components/ui/table/DataTable";
import { createColumns } from "./UserTableColumns";
import { useUserUIStore, useUserSelectionStore } from "../store";
import type { User } from "../userTypes.ts";
import { useDeleteUser } from "../hooks/useDeleteUser";
import UserDetailModal from "./UserDetailModal";
import { useState } from "react";

interface UsersTableProps {
  users: User[];
  currentPage: number;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const UsersTable = ({
  users,
  currentPage,
  totalCount,
  totalPages,
  pageSize,
  onPageChange,
  isLoading = false,
}: UsersTableProps) => {
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Zustand store for UI state
  const { openEditDrawer } = useUserUIStore();
  const { selectedUsers, toggleUser, selectAll } = useUserSelectionStore();

  const handleEditUser = (user: User) => {
    openEditDrawer(user.userId);
  };

  const handleDeleteUser = async (user: User) => {
    await deleteUser(user.userId);
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const allUserIds = users.map((user) => user.userId);

  return (
    <>
      <DataTable
        columns={createColumns(
          handleEditUser,
          handleDeleteUser,
          handleViewDetails,
          selectedUsers,
          toggleUser,
          selectAll,
          allUserIds
        )}
        data={users}
        loading={isLoading || isDeleting}
        emptyMessage="No users found."
        manualPagination={true}
        page={currentPage}
        pageSize={pageSize}
        total={totalCount}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <UserDetailModal
        user={selectedUser}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        onEdit={() => {
          if (selectedUser) {
            handleEditUser(selectedUser);
            setIsDetailModalOpen(false);
          }
        }}
        onDelete={() => {
          if (selectedUser) {
            handleDeleteUser(selectedUser);
            setIsDetailModalOpen(false);
          }
        }}
      />
    </>
  );
};

export default UsersTable;
