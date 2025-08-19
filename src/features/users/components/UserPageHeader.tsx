import { Button } from "@/components/ui/button/button";
import { Download, Plus, UserCheck, UserX } from "lucide-react";
import { useUserUIStore, useUserSelectionStore } from "../store";

interface UserPageHeaderProps {
  onBulkDelete: () => void;
  onBulkExport: () => void;
}

const UserPageHeader = ({
  onBulkDelete,
  onBulkExport,
}: UserPageHeaderProps) => {
  const { openAddDrawer } = useUserUIStore();
  const {
    selectedUsers,
    isSelectMode,
    toggleSelectMode,
    clearSelection,
    getSelectedCount,
  } = useUserSelectionStore();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage your users and their permissions
        </p>
      </div>
      <div className="flex items-center gap-2">
        {isSelectMode && (
          <>
            <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {getSelectedCount()} selected
            </div>
            <Button variant="outline" size="sm" onClick={onBulkExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="destructive" size="sm" onClick={onBulkDelete}>
              <UserX className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button variant="outline" size="sm" onClick={clearSelection}>
              Clear
            </Button>
          </>
        )}
        <Button variant="outline" size="sm" onClick={toggleSelectMode}>
          <UserCheck className="mr-2 h-4 w-4" />
          {isSelectMode ? "Cancel" : "Select"}
        </Button>
        <Button onClick={openAddDrawer}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
    </div>
  );
};

export default UserPageHeader;
