import { useState, useCallback } from "react";
import { useUserPreferencesStore } from "../store";
import { useUsers } from "./useUser";

interface UserFilters {
  searchTerm: string;
  statusFilter: string;
  pageNumber: number;
  pageSize: number;
}

export const useUserFilters = () => {
  const [filters, setFilters] = useState<UserFilters>({
    searchTerm: "",
    statusFilter: "all",
    pageNumber: 1,
    pageSize: 10,
  });

  const { showInactiveUsers } = useUserPreferencesStore();

  // Get users from backend with filters
  const {
    data: paginatedUsers,
    isLoading,
    error,
    isFetching,
  } = useUsers({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    searchTerm: filters.searchTerm || undefined,
  });

  // Apply client-side status filtering since backend doesn't support it
  const filteredUsers =
    paginatedUsers?.items.filter((user) => {
      const matchesStatus =
        filters.statusFilter === "all" || user.status === filters.statusFilter;
      const matchesActiveFilter = showInactiveUsers || user.status === "Active";
      return matchesStatus && matchesActiveFilter;
    }) || [];

  const updateFilters = useCallback((newFilters: Partial<UserFilters>) => {
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
    users: filteredUsers,
    paginatedUsers,
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
    totalCount: paginatedUsers?.totalCount || 0,
    totalPages: paginatedUsers?.totalPages || 0,
    currentPage: filters.pageNumber,
    pageSize: filters.pageSize,
  };
};
