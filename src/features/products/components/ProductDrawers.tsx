import { SideDrawer } from "@/components/ui/sheet/SideDrawer";
import { ProductCreateForm } from "./ProductCreateForm";
import ProductEditForm from "./ProductEditForm";
import { useProductUIStore } from "../stores";
import { useUIStore } from "@/store/ui";

interface ProductDrawersProps {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
}

const ProductDrawers = ({
  onAddSuccess,
  onEditSuccess,
}: ProductDrawersProps) => {
  const { selectedProductId } = useProductUIStore();
  const { activeDrawer, closeDrawer } = useUIStore();

  const isAddDrawerOpen = activeDrawer === "product-add";
  const isEditDrawerOpen = activeDrawer === "product-edit";

  return (
    <>
      <SideDrawer
        open={isAddDrawerOpen}
        onOpenChange={(open) => !open && closeDrawer()}
        title="Add New Product"
        description="Create a new product"
        side="right"
        widthClassName="w-full sm:max-w-2xl"
      >
        <ProductCreateForm onSuccess={onAddSuccess} onCancel={closeDrawer} />
      </SideDrawer>

      <SideDrawer
        open={isEditDrawerOpen}
        onOpenChange={(open) => !open && closeDrawer()}
        title="Edit Product"
        description="Update product information"
        side="right"
        widthClassName="w-full sm:max-w-2xl"
      >
        {selectedProductId && (
          <ProductEditForm
            productId={selectedProductId}
            onSuccess={onEditSuccess}
            onCancel={closeDrawer}
          />
        )}
      </SideDrawer>
    </>
  );
};

export default ProductDrawers;
