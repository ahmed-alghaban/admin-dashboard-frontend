import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCategory } from "../categoryService.ts";
import type { CategoryUpdateDto } from "../categoryTypes.ts";
import type { AxiosError } from "axios";

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
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as
        | { message?: string }
        | undefined;
      toast.error(errorData?.message || "Failed to update category");
    },
  });
};
