import { useState, useCallback, useMemo } from "react";
import { useOrders } from "./useOrders";
import type { OrderFilters } from "../orderTypes";

export const useOrderFilters = () => {
  const [filters, setFilters] = useState<OrderFilters>({
    searchTerm: "",
    statusFilter: "all",
    dateRange: {
      startDate: "",
      endDate: "",
    },
    pageNumber: 1,
    pageSize: 10,
  });

  // Get orders from backend with filters
  const {
    data: ordersResponse,
    isLoading,
    error,
    isFetching,
  } = useOrders(
    filters.pageNumber,
    filters.pageSize,
    filters.searchTerm || undefined,
    filters.statusFilter !== "all" ? filters.statusFilter : undefined,
    filters.dateRange.startDate || undefined,
    filters.dateRange.endDate || undefined
  );

  // Extract orders and pagination info
  const orders = useMemo(() => {
    if (!ordersResponse) return [];
    return ordersResponse.items || [];
  }, [ordersResponse]);

  const updateFilters = useCallback((newFilters: Partial<OrderFilters>) => {
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
    orders,
    ordersResponse,
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
    totalCount: ordersResponse?.totalItems || 0,
    totalPages: ordersResponse?.totalPages || 0,
    currentPage: filters.pageNumber,
    pageSize: filters.pageSize,
  };
};
