import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "../auditLogService.ts";
import type { PaginationResult } from "@/lib/types";
import type { AuditLog } from "../auditLogTypes.ts";

export const useAuditLogs = (pageNumber: number = 1, pageSize: number = 10) => {
  return useQuery<PaginationResult<AuditLog>>({
    queryKey: ["audit-logs", pageNumber, pageSize],
    queryFn: () => getAuditLogs(pageNumber, pageSize),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
