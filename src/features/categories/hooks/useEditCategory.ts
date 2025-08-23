import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCategory } from "../categoryService";
import type { CategoryUpdateDto } from "../categoryTypes";

interface EditCategoryParams {
  categoryId: string;
  category: CategoryUpdateDto;
}

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, category }: EditCategoryParams) =>
      updateCategory(categoryId, category),
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update category");
    },
  });
};
