import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getCategories, getCategory } from "../categoryService";
import type { Category } from "../categoryTypes";
import type { PaginationResult } from "@/lib/types";

interface UseCategoriesParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
}

export const useCategories = (params: UseCategoriesParams = {}) => {
  const { pageNumber = 1, pageSize = 10, searchTerm } = params;

  return useQuery<any, AxiosError>({
    queryKey: ["categories", params],
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
