import { useState, useCallback, useMemo } from "react";
import { useOrders } from "./useOrders";
import type { OrderFilters } from "../orderTypes.ts";

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

  // Check if client-side filters are applied
  const hasClientFilters =
    filters.statusFilter !== "all" ||
    filters.dateRange.startDate ||
    filters.dateRange.endDate;

  // Get orders from backend - fetch all orders when client-side filters are active
  const {
    data: ordersResponse,
    isLoading,
    error,
    isFetching,
  } = useOrders(
    hasClientFilters ? 1 : filters.pageNumber, // Always fetch page 1 when client-side filtering
    hasClientFilters ? 1000 : filters.pageSize, // Fetch large number when client-side filtering
    filters.searchTerm || undefined
  );

  // Apply client-side filtering
  const filteredOrders = useMemo(() => {
    if (!ordersResponse?.items) return [];

    return ordersResponse.items.filter((order) => {
      // Search filter
      const matchesSearch =
        !filters.searchTerm ||
        order.userFullName
          ?.toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        order.orderId
          ?.toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        order.paymentMethod
          ?.toLowerCase()
          .includes(filters.searchTerm.toLowerCase());

      // Status filter
      const matchesStatus =
        filters.statusFilter === "all" || order.status === filters.statusFilter;

      // Date range filter
      const orderDate = new Date(order.orderDate);
      const startDate = filters.dateRange.startDate
        ? new Date(filters.dateRange.startDate)
        : null;
      const endDate = filters.dateRange.endDate
        ? new Date(filters.dateRange.endDate)
        : null;

      const matchesDateRange =
        (!startDate || orderDate >= startDate) &&
        (!endDate || orderDate <= endDate);

      return matchesSearch && matchesStatus && matchesDateRange;
    });
  }, [
    ordersResponse?.items,
    filters.searchTerm,
    filters.statusFilter,
    filters.dateRange,
  ]);

  // Apply client-side pagination when filters are active
  const paginatedOrders = useMemo(() => {
    if (!hasClientFilters) {
      return filteredOrders; // Use server-side pagination
    }

    // Apply client-side pagination
    const startIndex = (filters.pageNumber - 1) * filters.pageSize;
    const endIndex = startIndex + filters.pageSize;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, hasClientFilters, filters.pageNumber, filters.pageSize]);

  const updateFilters = useCallback((newFilters: Partial<OrderFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // Reset to page 1 when any filter changes
      pageNumber: 1,
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
    orders: paginatedOrders,
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
    totalCount: filteredOrders.length,
    totalPages: hasClientFilters
      ? Math.ceil(filteredOrders.length / filters.pageSize)
      : ordersResponse?.totalPages || 0,
    currentPage: filters.pageNumber,
    pageSize: filters.pageSize,
  };
};
