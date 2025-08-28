import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addCategory } from "../categoryService.ts";
import type { CategoryCreateDto } from "../categoryTypes.ts";
import type { AxiosError } from "axios";

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: CategoryCreateDto) => addCategory(category),
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as
        | { message?: string }
        | undefined;
      toast.error(errorData?.message || "Failed to create category");
    },
  });
};
