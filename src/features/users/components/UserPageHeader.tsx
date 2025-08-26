import { Button } from "@/components/ui/button/button";
import { Plus, Download, UserX } from "lucide-react";
import { useUserUIStore, useUserSelectionStore } from "../store";
import { exportToExcel, formatUserDataForExport } from "@/lib/utils";
import { toast } from "sonner";
import type { User } from "../userTypes";

interface UserPageHeaderProps {
  onBulkDelete: () => void;
  users: User[];
}

const UserPageHeader = ({ onBulkDelete, users }: UserPageHeaderProps) => {
  const { openAddDrawer } = useUserUIStore();
  const { selectedUsers, getSelectedCount, clearSelection } =
    useUserSelectionStore();

  const handleExport = () => {
    try {
      let dataToExport: User[];
      let filename: string;

      if (selectedUsers.size > 0) {
        // Export selected users
        dataToExport = users.filter((user) => selectedUsers.has(user.userId));
        filename = `selected-users-${new Date().toISOString().split("T")[0]}`;
        toast.success(`${dataToExport.length} users exported successfully!`);
      } else {
        // Export all users
        dataToExport = users;
        filename = `users-${new Date().toISOString().split("T")[0]}`;
        toast.success("All users exported successfully!");
      }

      const formattedData = formatUserDataForExport(dataToExport);
      exportToExcel(formattedData, filename);
    } catch (error) {
      toast.error("Failed to export users");
      console.error("Export error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage user accounts and permissions
        </p>
      </div>
      <div className="flex items-center gap-2">
        {selectedUsers.size > 0 && (
          <>
            <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {getSelectedCount()} selected
            </div>
            <Button variant="destructive" size="sm" onClick={onBulkDelete}>
              <UserX className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
            <Button variant="outline" size="sm" onClick={clearSelection}>
              Clear Selection
            </Button>
          </>
        )}
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          {selectedUsers.size > 0
            ? `Export Selected (${selectedUsers.size})`
            : "Export All"}
        </Button>
        <Button variant="outline" onClick={openAddDrawer}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
    </div>
  );
};

export default UserPageHeader;
