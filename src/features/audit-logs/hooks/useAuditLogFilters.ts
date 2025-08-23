import { useState, useCallback } from "react";
import { useAuditLogs } from "./useAuditLogs";
import type { AuditLogFilters } from "../auditLogTypes";

export const useAuditLogFilters = () => {
  const [filters, setFilters] = useState<AuditLogFilters>({
    searchTerm: "",
    actionTypeFilter: "all",
    entityFilter: "all",
    dateRange: {
      startDate: "",
      endDate: "",
    },
    pageNumber: 1,
    pageSize: 10,
  });

  // Get audit logs from backend with filters
  const {
    data: paginatedAuditLogs,
    isLoading,
    error,
    isFetching,
  } = useAuditLogs(filters.pageNumber, filters.pageSize);

  // Apply client-side filtering since backend doesn't support advanced filtering
  const filteredAuditLogs =
    paginatedAuditLogs?.items.filter((auditLog) => {
      const matchesActionType =
        filters.actionTypeFilter === "all" ||
        auditLog.actionType === filters.actionTypeFilter;

      const matchesEntity =
        filters.entityFilter === "all" ||
        auditLog.entityName
          .toLowerCase()
          .includes(filters.entityFilter.toLowerCase());

      const matchesDateRange = (() => {
        if (!filters.dateRange.startDate && !filters.dateRange.endDate) {
          return true;
        }

        const logDate = new Date(auditLog.timestamp);
        const startDate = filters.dateRange.startDate
          ? new Date(filters.dateRange.startDate)
          : null;
        const endDate = filters.dateRange.endDate
          ? new Date(filters.dateRange.endDate)
          : null;

        if (startDate && endDate) {
          return logDate >= startDate && logDate <= endDate;
        } else if (startDate) {
          return logDate >= startDate;
        } else if (endDate) {
          return logDate <= endDate;
        }

        return true;
      })();

      const matchesSearch =
        !filters.searchTerm ||
        auditLog.description
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        auditLog.entityName
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        auditLog.ipAddress
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase());

      return (
        matchesActionType && matchesEntity && matchesDateRange && matchesSearch
      );
    }) || [];

  // Check if client-side filters are applied
  const hasClientFilters =
    filters.actionTypeFilter !== "all" ||
    filters.entityFilter !== "all" ||
    filters.dateRange.startDate ||
    filters.dateRange.endDate ||
    filters.searchTerm;

  const updateFilters = useCallback((newFilters: Partial<AuditLogFilters>) => {
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
    auditLogs: filteredAuditLogs,
    auditLogsResponse: paginatedAuditLogs,
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
    totalCount: paginatedAuditLogs?.totalItems || 0,
    totalPages: paginatedAuditLogs?.totalPages || 0,
    currentPage: filters.pageNumber,
    pageSize: filters.pageSize,
    hasClientFilters,
  };
};
