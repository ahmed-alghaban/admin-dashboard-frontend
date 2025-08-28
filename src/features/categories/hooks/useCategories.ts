import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getCategories, getCategory } from "../categoryService.ts";
import type { Category } from "../categoryTypes.ts";

export const useCategories = () => {
  return useQuery<Category[], AxiosError>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};

export const useGetCategoryById = (categoryId: string) => {
  return useQuery<Category, AxiosError>({
    queryKey: ["category", categoryId],
    queryFn: () => getCategory(categoryId),
    enabled: !!categoryId,
  });
};
