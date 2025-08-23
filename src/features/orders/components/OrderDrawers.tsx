import { SideDrawer } from "@/components/ui/sheet/SideDrawer";
import { useUIStore } from "@/store/ui";
import { useOrderUIStore } from "../stores";
import OrderCreateForm from "./OrderCreateForm";
import OrderEditForm from "./OrderEditForm";

interface OrderDrawersProps {
  onAddSuccess?: () => void;
  onEditSuccess?: () => void;
}

const OrderDrawers = ({ onAddSuccess, onEditSuccess }: OrderDrawersProps) => {
  const { activeDrawer } = useUIStore();
  const { selectedOrderId, closeAddDrawer, closeEditDrawer } =
    useOrderUIStore();

  const isAddDrawerOpen = activeDrawer === "add-order";
  const isEditDrawerOpen = activeDrawer === "edit-order";

  return (
    <>
      <SideDrawer
        open={isAddDrawerOpen}
        onOpenChange={(open) => !open && closeAddDrawer()}
        title="Add New Order"
        description="Create a new order for a customer"
      >
        <OrderCreateForm onSuccess={onAddSuccess} onCancel={closeAddDrawer} />
      </SideDrawer>

      <SideDrawer
        open={isEditDrawerOpen}
        onOpenChange={(open) => !open && closeEditDrawer()}
        title="Edit Order"
        description="Update order information"
      >
        <OrderEditForm
          orderId={selectedOrderId}
          onSuccess={onEditSuccess}
          onCancel={closeEditDrawer}
        />
      </SideDrawer>
    </>
  );
};

export default OrderDrawers;
