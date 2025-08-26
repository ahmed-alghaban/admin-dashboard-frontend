import { create } from "zustand";

interface AuditLogSelectionState {
  selectedAuditLogs: Set<string>;
  isSelectMode: boolean;

  toggleAuditLog: (auditLogId: string) => void;
  selectAll: (auditLogIds: string[]) => void;
  clearSelection: () => void;
  toggleSelectMode: () => void;
  selectAuditLog: (auditLogId: string) => void;
  deselectAuditLog: (auditLogId: string) => void;
  getSelectedCount: () => number;
}

export const useAuditLogSelectionStore = create<AuditLogSelectionState>(
  (set, get) => ({
    selectedAuditLogs: new Set(),
    isSelectMode: false,

    toggleAuditLog: (auditLogId: string) =>
      set((state) => {
        const newSelectedAuditLogs = new Set(state.selectedAuditLogs);
        if (newSelectedAuditLogs.has(auditLogId)) {
          newSelectedAuditLogs.delete(auditLogId);
        } else {
          newSelectedAuditLogs.add(auditLogId);
        }
        return { selectedAuditLogs: newSelectedAuditLogs };
      }),

    selectAll: (auditLogIds: string[]) =>
      set({ selectedAuditLogs: new Set(auditLogIds) }),

    clearSelection: () => set({ selectedAuditLogs: new Set() }),

    toggleSelectMode: () =>
      set((state) => ({
        isSelectMode: !state.isSelectMode,
        selectedAuditLogs: new Set(), // Clear selection when toggling mode
      })),

    selectAuditLog: (auditLogId: string) =>
      set((state) => {
        const newSelectedAuditLogs = new Set(state.selectedAuditLogs);
        newSelectedAuditLogs.add(auditLogId);
        return { selectedAuditLogs: newSelectedAuditLogs };
      }),

    deselectAuditLog: (auditLogId: string) =>
      set((state) => {
        const newSelectedAuditLogs = new Set(state.selectedAuditLogs);
        newSelectedAuditLogs.delete(auditLogId);
        return { selectedAuditLogs: newSelectedAuditLogs };
      }),

    getSelectedCount: () => get().selectedAuditLogs.size,
  })
);
