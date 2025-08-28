import { useState, useCallback } from "react";
import { useInventories } from "./useInventories";
import type { InventoryFilters } from "../inventoryTypes.ts";

export const useInventoryFilters = () => {
  const [filters, setFilters] = useState<InventoryFilters>({
    searchTerm: "",
    productFilter: "all",
    stockLevelFilter: "all",
    pageNumber: 1,
    pageSize: 10,
  });

  // Get inventories from backend with filters
  const {
    data: paginatedInventories,
    isLoading,
    error,
    isFetching,
  } = useInventories(filters.pageNumber, filters.pageSize);

  // Apply client-side filtering since backend doesn't support advanced filtering
  const filteredInventories =
    paginatedInventories?.items.filter((inventory) => {
      const matchesProduct =
        filters.productFilter === "all" ||
        inventory.productId === filters.productFilter;

      const matchesStockLevel = (() => {
        switch (filters.stockLevelFilter) {
          case "low":
            return inventory.quantityAvailable <= inventory.reorderLevel;
          case "out":
            return inventory.quantityAvailable === 0;
          case "normal":
            return inventory.quantityAvailable > inventory.reorderLevel;
          default:
            return true;
        }
      })();

      return matchesProduct && matchesStockLevel;
    }) || [];

  // Check if client-side filters are applied
  const hasClientFilters =
    filters.productFilter !== "all" || filters.stockLevelFilter !== "all";

  const updateFilters = useCallback((newFilters: Partial<InventoryFilters>) => {
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
    inventories: filteredInventories,
    inventoriesResponse: paginatedInventories,
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
    totalCount: paginatedInventories?.totalItems || 0,
    totalPages: paginatedInventories?.totalPages || 0,
    currentPage: filters.pageNumber,
    pageSize: filters.pageSize,
    hasClientFilters,
  };
};
