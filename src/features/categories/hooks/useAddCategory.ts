import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addCategory } from "../categoryService";
import type { CategoryCreateDto } from "../categoryTypes";

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: CategoryCreateDto) => addCategory(category),
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create category");
    },
  });
};
