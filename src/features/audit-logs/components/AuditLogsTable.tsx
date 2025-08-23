import { DataTable } from "@/components/ui/table/DataTable";
import { createColumns } from "./AuditLogTableColumns";
import type { AuditLog } from "../auditLogTypes";
import AuditLogDetailModal from "./AuditLogDetailModal";
import { useState } from "react";

interface AuditLogsTableProps {
  auditLogs: AuditLog[];
  currentPage: number;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const AuditLogsTable = ({
  auditLogs,
  currentPage,
  totalCount,
  totalPages,
  pageSize,
  onPageChange,
  isLoading = false,
}: AuditLogsTableProps) => {
  const [selectedAuditLog, setSelectedAuditLog] = useState<AuditLog | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewDetails = (auditLog: AuditLog) => {
    setSelectedAuditLog(auditLog);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <DataTable
        columns={createColumns(handleViewDetails)}
        data={auditLogs}
        loading={isLoading}
        emptyMessage="No audit logs found."
        manualPagination={true}
        page={currentPage}
        pageSize={pageSize}
        total={totalCount}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <AuditLogDetailModal
        auditLog={selectedAuditLog}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </>
  );
};

export default AuditLogsTable;
