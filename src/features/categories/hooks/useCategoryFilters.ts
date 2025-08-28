import { useState, useMemo } from "react";
import { useCategories } from "./useCategories";
import { useCategoryPreferencesStore } from "../stores/categoryPreferencesStore";
import type { Category } from "../categoryTypes.ts";

interface CategoryFilters {
  searchTerm: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export const useCategoryFilters = () => {
  const [filters, setFilters] = useState<CategoryFilters>({
    searchTerm: "",
    sortBy: "name",
    sortOrder: "asc",
  });

  const { pageSize } = useCategoryPreferencesStore();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: categoriesResponse,
    isLoading,
    isFetching,
    error,
  } = useCategories();

  // Handle categories response
  const categories = useMemo(() => {
    if (!categoriesResponse) return [];
    return Array.isArray(categoriesResponse) ? categoriesResponse : [];
  }, [categoriesResponse]);

  const filteredAndSortedCategories = useMemo(() => {
    let result = [...(categories || [])];

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        (category) =>
          category.name.toLowerCase().includes(searchLower) ||
          category.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[filters.sortBy as keyof Category];
      const bValue = b[filters.sortBy as keyof Category];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return filters.sortOrder === "asc" ? comparison : -comparison;
      }

      return 0;
    });

    return result;
  }, [categories, filters]);

  const updateFilters = (newFilters: Partial<CategoryFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const setPageSize = (size: number) => {
    useCategoryPreferencesStore.getState().setPageSize(size);
    setCurrentPage(1);
  };

  // Calculate total count and pages
  const totalCount = useMemo(() => {
    return filteredAndSortedCategories.length;
  }, [filteredAndSortedCategories.length]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredAndSortedCategories.length / pageSize);
  }, [filteredAndSortedCategories.length, pageSize]);

  return {
    categories: filteredAndSortedCategories,
    isLoading,
    isFetching,
    error,
    filters,
    updateFilters,
    setPage,
    setPageSize,
    currentPage,
    pageSize,
    totalCount,
    totalPages,
  };
};
