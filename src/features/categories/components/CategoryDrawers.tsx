import { SideDrawer } from "@/components/ui/sheet/SideDrawer";
import { CategoryCreateForm } from "./CategoryCreateForm";
import { CategoryEditForm } from "./CategoryEditForm";
import { useCategoryUIStore } from "../stores";
import { useUIStore } from "@/store/ui";

interface CategoryDrawersProps {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
}

const CategoryDrawers = ({
  onAddSuccess,
  onEditSuccess,
}: CategoryDrawersProps) => {
  const { selectedCategoryId } = useCategoryUIStore();
  const { activeDrawer, closeDrawer } = useUIStore();

  const isAddDrawerOpen = activeDrawer === "category-add";
  const isEditDrawerOpen = activeDrawer === "category-edit";

  return (
    <>
      <SideDrawer
        open={isAddDrawerOpen}
        onOpenChange={(open) => !open && closeDrawer()}
        title="Add New Category"
        description="Create a new category for your products"
        side="right"
        widthClassName="w-full sm:max-w-2xl"
      >
        <CategoryCreateForm onSuccess={onAddSuccess} onCancel={closeDrawer} />
      </SideDrawer>

      <SideDrawer
        open={isEditDrawerOpen}
        onOpenChange={(open) => !open && closeDrawer()}
        title="Edit Category"
        description="Update category information"
        side="right"
        widthClassName="w-full sm:max-w-2xl"
      >
        {selectedCategoryId && (
          <CategoryEditForm
            categoryId={selectedCategoryId}
            onSuccess={onEditSuccess}
            onCancel={closeDrawer}
          />
        )}
      </SideDrawer>
    </>
  );
};

export default CategoryDrawers;
