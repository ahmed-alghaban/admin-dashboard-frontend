import { useState, useMemo } from "react";
import { useUserPreferencesStore } from "../store";
import type { User } from "../userTypes";

export const useUserFilters = (users: User[] = []) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { showInactiveUsers } = useUserPreferencesStore();

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      const matchesActiveFilter = showInactiveUsers || user.status === "Active";

      return matchesSearch && matchesStatus && matchesActiveFilter;
    });
  }, [users, searchTerm, statusFilter, showInactiveUsers]);

  const updateFilters = (filters: {
    searchTerm: string;
    statusFilter: string;
  }) => {
    setSearchTerm(filters.searchTerm);
    setStatusFilter(filters.statusFilter);
  };

  return {
    filteredUsers,
    searchTerm,
    statusFilter,
    updateFilters,
  };
};
