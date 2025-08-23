import { useState, useMemo } from "react";
import { useCategories } from "./useCategories";
import { useCategoryPreferencesStore } from "../stores/categoryPreferencesStore";
import type { Category } from "../categoryTypes";

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
  } = useCategories({
    pageNumber: currentPage,
    pageSize,
    searchTerm: filters.searchTerm,
  });

  // Handle both paginated and non-paginated responses
  const categories = useMemo(() => {
    if (!categoriesResponse) return [];

    // If it's a paginated result (has items property)
    if (
      categoriesResponse &&
      typeof categoriesResponse === "object" &&
      "items" in categoriesResponse
    ) {
      return categoriesResponse.items || [];
    }

    // If it's a direct array
    if (Array.isArray(categoriesResponse)) {
      return categoriesResponse;
    }

    // If it's an object with a result property that might be an array
    if (
      categoriesResponse &&
      typeof categoriesResponse === "object" &&
      "result" in categoriesResponse
    ) {
      const result = categoriesResponse.result;
      return Array.isArray(result) ? result : [];
    }

    return [];
  }, [categoriesResponse]);

  const filteredAndSortedCategories = useMemo(() => {
    let result = [...categories];

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

  // Calculate total count and pages based on response structure
  const totalCount = useMemo(() => {
    if (!categoriesResponse) return 0;

    // If it's a paginated result
    if (
      categoriesResponse &&
      typeof categoriesResponse === "object" &&
      "totalItems" in categoriesResponse
    ) {
      return categoriesResponse.totalItems || 0;
    }

    // If it's a direct array or other structure, use the filtered length
    return filteredAndSortedCategories.length;
  }, [categoriesResponse, filteredAndSortedCategories.length]);

  const totalPages = useMemo(() => {
    if (!categoriesResponse) return 1;

    // If it's a paginated result
    if (
      categoriesResponse &&
      typeof categoriesResponse === "object" &&
      "totalPages" in categoriesResponse
    ) {
      return categoriesResponse.totalPages || 1;
    }

    // Calculate based on filtered results
    return Math.ceil(filteredAndSortedCategories.length / pageSize);
  }, [categoriesResponse, filteredAndSortedCategories.length, pageSize]);

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
