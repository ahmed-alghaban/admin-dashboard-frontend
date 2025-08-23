import { GenericForm } from "@/components/ui/form/GenericForm";
import { TextField } from "@/components/ui/form/fields/TextField";
import { SelectField } from "@/components/ui/form/fields/SelectField";
import { NumberField } from "@/components/ui/form/fields/NumberField";
import { Button } from "@/components/ui/button/button";
import {
  productCreateSchema,
  type ProductCreateFormData,
} from "../schemas/productSchema";
import { defaultValues } from "../productTypes";
import { logger } from "@/lib/logger";
import { useCreateProduct } from "../hooks/useCreateProducts";
import { useCategories } from "../hooks/useCategories";
import type { UserCreateFormProps } from "@/lib/types";

export const ProductCreateForm = ({
  onSuccess,
  onCancel,
}: UserCreateFormProps) => {
  const { mutate: createProduct, isPending } = useCreateProduct();
  const { data: categories } = useCategories();

  // Create category options from API data
  const categoryOptions =
    categories?.items?.map(
      (category: { categoryId: string; name: string }) => ({
        label: category.name,
        value: category.categoryId,
      })
    ) || [];

  const handleSubmit = async (data: ProductCreateFormData) => {
    try {
      await createProduct(
        {
          ...data,
        },
        {
          onSuccess: () => {
            logger.log(data);
            onSuccess?.();
          },
        }
      );
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="w-full">
      <GenericForm
        schema={productCreateSchema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {(form) => (
          <>
            <TextField
              name="productName"
              label="Product Name *"
              placeholder="Enter product name"
            />

            <TextField
              name="description"
              label="Description *"
              placeholder="Enter product description"
            />

            <TextField
              name="sku"
              label="SKU *"
              placeholder="Enter product SKU"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NumberField
                name="price"
                label="Price *"
                placeholder="0.00"
                min={0}
                step={0.01}
              />
              <NumberField
                name="quantityInStock"
                label="Quantity in Stock *"
                placeholder="0"
                min={0}
                step={1}
              />
            </div>

            <SelectField
              name="categoryId"
              label="Category *"
              options={categoryOptions}
              placeholder="Select a category"
            />

            <TextField
              name="imageUrl"
              label="Image URL"
              placeholder="Enter product image URL (optional)"
              type="url"
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {form.formState.isSubmitting ? "Creating..." : "Create Product"}
              </Button>
            </div>
          </>
        )}
      </GenericForm>
    </div>
  );
};
