// Audit Action Type
export type AuditActionType =
  | "Create"
  | "Update"
  | "Delete"
  | "Login"
  | "Logout"
  | "View"
  | "Export"
  | "Import";

// Audit Log DTO (response from API)
export interface AuditLog {
  auditLogId: string; // Guid maps to string
  userId: string; // Guid maps to string
  actionType: AuditActionType;
  entityName: string;
  description: string;
  ipAddress: string;
  timestamp: string; // DateTime maps to string
}

// Audit Log Filters
export interface AuditLogFilters {
  searchTerm: string;
  actionTypeFilter: string;
  entityFilter: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  pageNumber: number;
  pageSize: number;
}

// Paginated Audit Log Response
export interface PaginatedAuditLogResponse {
  items: AuditLog[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
