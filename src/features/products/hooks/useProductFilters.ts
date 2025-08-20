import { useState, useCallback } from "react";
import { useProducts } from "./useProducts";

interface ProductFilters {
  searchTerm: string;
  categoryFilter: string;
  statusFilter: string;
  pageNumber: number;
  pageSize: number;
}

export const useProductFilters = () => {
  const [filters, setFilters] = useState<ProductFilters>({
    searchTerm: "",
    categoryFilter: "all",
    statusFilter: "all",
    pageNumber: 1,
    pageSize: 10,
  });

  // Get products from backend with filters
  const {
    data: paginatedProducts,
    isLoading,
    error,
    isFetching,
  } = useProducts(
    filters.pageNumber,
    filters.pageSize,
    filters.searchTerm || undefined
  );

  // Apply client-side filtering since backend doesn't support category/status filtering
  const filteredProducts =
    paginatedProducts?.items.filter((product) => {
      const matchesCategory =
        filters.categoryFilter === "all" ||
        product.category?.categoryId === filters.categoryFilter;
      const matchesStatus =
        filters.statusFilter === "all" ||
        product.isActive === (filters.statusFilter === "active");
      return matchesCategory && matchesStatus;
    }) || [];

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // Reset to page 1 when search term changes
      pageNumber: newFilters.searchTerm !== undefined ? 1 : prev.pageNumber,
    }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, pageNumber: page }));
  }, []);

  const setPageSize = useCallback((size: number) => {
    setFilters((prev) => ({ ...prev, pageSize: size, pageNumber: 1 }));
  }, []);

  return {
    // Data
    products: filteredProducts,
    paginatedProducts,
    isLoading,
    isFetching,
    error,

    // Filters
    filters,
    updateFilters,

    // Pagination
    setPage,
    setPageSize,

    // Computed values
    totalCount: filteredProducts.length,
    totalPages: paginatedProducts?.totalPages || 0,
    currentPage: filters.pageNumber,
    pageSize: filters.pageSize,
  };
};
