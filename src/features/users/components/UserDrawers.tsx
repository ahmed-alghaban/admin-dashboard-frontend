import { SideDrawer } from "@/components/ui/sheet/SideDrawer";
import { UserCreateForm } from "./UserCreateForm";
import UserEditForm from "./UserEditForm";
import { useUserUIStore } from "../store";
import { useUIStore } from "@/store/ui";

interface UserDrawersProps {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
}

const UserDrawers = ({ onAddSuccess, onEditSuccess }: UserDrawersProps) => {
  const { selectedUserId } = useUserUIStore();
  const { activeDrawer, closeDrawer } = useUIStore();

  const isAddDrawerOpen = activeDrawer === "user-add";
  const isEditDrawerOpen = activeDrawer === "user-edit";

  return (
    <>
      <SideDrawer
        open={isAddDrawerOpen}
        onOpenChange={(open) => !open && closeDrawer()}
        title="Add New User"
        description="Create a new user account"
        side="right"
        widthClassName="w-full sm:max-w-2xl"
      >
        <UserCreateForm onSuccess={onAddSuccess} onCancel={closeDrawer} />
      </SideDrawer>

      <SideDrawer
        open={isEditDrawerOpen}
        onOpenChange={(open) => !open && closeDrawer()}
        title="Edit User"
        description="Update user information"
        side="right"
        widthClassName="w-full sm:max-w-2xl"
      >
        {selectedUserId && (
          <UserEditForm
            userId={selectedUserId}
            onSuccess={onEditSuccess}
            onCancel={closeDrawer}
          />
        )}
      </SideDrawer>
    </>
  );
};

export default UserDrawers;
