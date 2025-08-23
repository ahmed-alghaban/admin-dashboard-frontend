import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuditLogPreferencesState {
  pageSize: number;
  sortBy: string;
  sortOrder: "asc" | "desc";

  // Actions
  setPageSize: (size: number) => void;
  setSortBy: (field: string) => void;
  setSortOrder: (order: "asc" | "desc") => void;
}

export const useAuditLogPreferencesStore = create<AuditLogPreferencesState>()(
  persist(
    (set) => ({
      pageSize: 10,
      sortBy: "timestamp",
      sortOrder: "desc",

      setPageSize: (size) => set({ pageSize: size }),
      setSortBy: (field) => set({ sortBy: field }),
      setSortOrder: (order) => set({ sortOrder: order }),
    }),
    {
      name: "audit-log-preferences",
    }
  )
);
