import { Button } from "@/components/ui/button/button";
import { GenericForm } from "@/components/ui/form/GenericForm";
import { productEditSchema } from "../schemas";
import type { z } from "zod";
import { TextField } from "@/components/ui/form/fields/TextField";
import { SelectField } from "@/components/ui/form/fields/SelectField";
import { NumberField } from "@/components/ui/form/fields/NumberField";
import { useEditProduct } from "../hooks/useEditProduct";
import { useGetProductById } from "../hooks/useGetProductById";
import { useCategories } from "../hooks/useCategories";
import type { ProductEditFormProps } from "@/lib/types";

const ProductEditForm = ({
  productId,
  onSuccess,
  onCancel,
}: ProductEditFormProps) => {
  const { mutate: editProduct, isPending } = useEditProduct();
  const {
    data: productResponse,
    isLoading,
    error,
  } = useGetProductById(productId);
  const { data: categories } = useCategories();

  // Create category options from API data, filtering out the current product's category
  const currentProductCategoryId = productResponse?.category?.categoryId;
  const currentProductCategoryName = productResponse?.category?.name;

  // Create category options excluding the current product's category
  const categoryOptions =
    categories?.items
      ?.filter(
        (category: { categoryId: string; name: string }) =>
          category.categoryId !== currentProductCategoryId
      )
      .map((category: { categoryId: string; name: string }) => ({
        label: category.name,
        value: category.categoryId,
      })) || [];

  // Add current product's category as the first option if it exists
  const allCategoryOptions =
    currentProductCategoryId && currentProductCategoryName
      ? [
          {
            label: currentProductCategoryName,
            value: currentProductCategoryId,
          },
          ...categoryOptions,
        ]
      : categoryOptions;

  const handleSubmit = async (data: z.infer<typeof productEditSchema>) => {
    // Ensure required fields are included and filter out empty values for optional fields
    const filteredData = {
      price: data.price || 0,
      categoryId: data.categoryId || "",
      ...Object.fromEntries(
        Object.entries(data).filter(
          ([key, value]) =>
            key !== "price" &&
            key !== "categoryId" &&
            value !== undefined &&
            value !== null &&
            value !== ""
        )
      ),
    };

    await editProduct(
      { productId, product: filteredData },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <div className="text-muted-foreground">Loading product data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <div className="text-destructive">Error loading product data</div>
        </div>
      </div>
    );
  }

  // Transform the API response to match the form schema
  const productData = productResponse
    ? {
        productName: productResponse.productName || "",
        description: productResponse.description || "",
        sku: productResponse.sku || "",
        price: productResponse.price || 0,
        quantityInStock: productResponse.quantityInStock || 0,
        categoryId:
          productResponse.categoryId ||
          productResponse.category?.categoryId ||
          "",
        imageUrl: productResponse.imageUrl || "",
      }
    : {};

  return (
    <div className="w-full">
      <GenericForm
        schema={productEditSchema}
        defaultValues={productData}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {(form) => (
          <>
            <TextField
              name="productName"
              label="Product Name"
              placeholder="Enter product name"
            />

            <TextField
              name="description"
              label="Description"
              placeholder="Enter product description"
            />

            <TextField name="sku" label="SKU" placeholder="Enter product SKU" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NumberField
                name="price"
                label="Price"
                placeholder="0.00"
                min={0}
                step={0.01}
              />
              <NumberField
                name="quantityInStock"
                label="Quantity in Stock"
                placeholder="0"
                min={0}
                step={1}
              />
            </div>

            <SelectField
              name="categoryId"
              label="Category"
              options={allCategoryOptions}
              placeholder="Select a category (optional)"
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
                {form.formState.isSubmitting ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </>
        )}
      </GenericForm>
    </div>
  );
};

export default ProductEditForm;
