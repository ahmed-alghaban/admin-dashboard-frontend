import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../categories/categoryService";
import type { PaginationResult } from "@/lib/types";
import type { Category } from "../../categories/categoryTypes";

export const useCategories = () => {
  return useQuery<PaginationResult<Category>>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
