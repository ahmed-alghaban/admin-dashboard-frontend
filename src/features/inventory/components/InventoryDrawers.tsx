import { SideDrawer } from "@/components/ui/sheet/SideDrawer";
import InventoryEditForm from "./InventoryEditForm";
import { useInventoryUIStore } from "../stores";

interface InventoryDrawersProps {
  onEditSuccess: () => void;
}

const InventoryDrawers = ({ onEditSuccess }: InventoryDrawersProps) => {
  const { isEditDrawerOpen, closeEditDrawer, selectedInventory } =
    useInventoryUIStore();

  return (
    <>
      <SideDrawer
        open={isEditDrawerOpen}
        onOpenChange={(open) => !open && closeEditDrawer()}
        title="Update Inventory Quantity"
        description="Update the available quantity for this inventory item"
        side="right"
        widthClassName="w-full sm:max-w-lg"
      >
        {selectedInventory && (
          <InventoryEditForm
            inventory={selectedInventory}
            onSuccess={onEditSuccess}
            onCancel={closeEditDrawer}
          />
        )}
      </SideDrawer>
    </>
  );
};

export default InventoryDrawers;
