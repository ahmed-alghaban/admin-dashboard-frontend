import api from "@/lib/axios";
import type { AuditLog } from "./auditLogTypes.ts";
import type { PaginationResult } from "@/lib/types";
import { logger } from "@/lib/logger";

export const getAuditLogs = async (
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<PaginationResult<AuditLog>> => {
  const queryParams = new URLSearchParams();
  queryParams.append("pageNumber", pageNumber.toString());
  queryParams.append("pageSize", pageSize.toString());

  const response = await api.get(`/audit-logs?${queryParams.toString()}`);
  logger.log("getAuditLogs response:", response.data);
  return response.data.result;
};
