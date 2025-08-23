import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button/button";
import { FormSkeleton } from "@/components/ui/skeleton/FormSkeleton";
import {
  categoryCreateSchema,
  type CategoryCreateFormData,
} from "../schemas/categorySchema";
import { useAddCategory } from "../hooks";
import { TextField } from "@/components/ui/form/fields/TextField";

interface CategoryCreateFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

export const CategoryCreateForm = ({
  onSuccess,
  onCancel,
}: CategoryCreateFormProps) => {
  const methods = useForm<CategoryCreateFormData>({
    resolver: zodResolver(categoryCreateSchema),
  });

  const addCategoryMutation = useAddCategory();

  const onSubmit = async (data: CategoryCreateFormData) => {
    try {
      await addCategoryMutation.mutateAsync(data);
      methods.reset();
      onSuccess();
    } catch (error) {
      // Error is handled by the mutation
      console.error("Failed to create category:", error);
    }
  };

  if (addCategoryMutation.isPending) {
    return <FormSkeleton />;
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
              methods.formState.isSubmitting || addCategoryMutation.isPending
            }
            className="flex-1"
          >
            {methods.formState.isSubmitting || addCategoryMutation.isPending
              ? "Creating..."
              : "Create Category"}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={
                methods.formState.isSubmitting || addCategoryMutation.isPending
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
