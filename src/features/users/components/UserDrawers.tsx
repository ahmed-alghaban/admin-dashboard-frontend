import { SideDrawer } from "@/components/ui/sheet/SideDrawer";
import { UserCreateForm } from "./UserCreateForm";
import UserEditForm from "./UserEditForm";
import { useUserUIStore } from "../store";

interface UserDrawersProps {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
}

const UserDrawers = ({ onAddSuccess, onEditSuccess }: UserDrawersProps) => {
  const {
    isAddDrawerOpen,
    isEditDrawerOpen,
    selectedUserId,
    closeAddDrawer,
    closeEditDrawer,
  } = useUserUIStore();

  return (
    <>
      <SideDrawer
        open={isAddDrawerOpen}
        onOpenChange={(open) => !open && closeAddDrawer()}
        title="Add New User"
        description="Create a new user account"
        side="right"
        widthClassName="w-full sm:max-w-2xl"
      >
        <UserCreateForm onSuccess={onAddSuccess} onCancel={closeAddDrawer} />
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
            onSuccess={onEditSuccess}
            onCancel={closeEditDrawer}
          />
        )}
      </SideDrawer>
    </>
  );
};

export default UserDrawers;
