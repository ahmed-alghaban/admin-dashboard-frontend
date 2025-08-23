import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button/button";
import { FormSkeleton } from "@/components/ui/skeleton/FormSkeleton";
import {
  categoryEditSchema,
  type CategoryEditFormData,
} from "../schemas/categoryEditSchema";
import { useEditCategory, useGetCategoryById } from "../hooks";
import { TextField } from "@/components/ui/form/fields/TextField";
import { useEffect } from "react";

interface CategoryEditFormProps {
  categoryId?: string;
  onSuccess: () => void;
  onCancel?: () => void;
}

export const CategoryEditForm = ({
  categoryId,
  onSuccess,
  onCancel,
}: CategoryEditFormProps) => {
  const methods = useForm<CategoryEditFormData>({
    resolver: zodResolver(categoryEditSchema),
  });

  const { data: category, isLoading: isLoadingCategory } = useGetCategoryById(
    categoryId || ""
  );
  const editCategoryMutation = useEditCategory();

  // Populate form when category data is loaded
  useEffect(() => {
    if (category) {
      methods.setValue("name", category.name);
      methods.setValue("description", category.description);
    }
  }, [category, methods]);

  const onSubmit = async (data: CategoryEditFormData) => {
    if (!categoryId) return;

    try {
      await editCategoryMutation.mutateAsync({ categoryId, category: data });
      onSuccess();
    } catch (error) {
      // Error is handled by the mutation
      console.error("Failed to update category:", error);
    }
  };

  if (isLoadingCategory || editCategoryMutation.isPending) {
    return <FormSkeleton />;
  }

  if (!category) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <TextField
          name="name"
          label="Category Name"
          placeholder="Enter category name"
        />

        <TextField
          name="description"
          label="Description"
          placeholder="Enter category description"
          multiline
          rows={3}
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={
              methods.formState.isSubmitting || editCategoryMutation.isPending
            }
            className="flex-1"
          >
            {methods.formState.isSubmitting || editCategoryMutation.isPending
              ? "Updating..."
              : "Update Category"}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={
                methods.formState.isSubmitting || editCategoryMutation.isPending
              }
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
