import { DataTable } from "@/components/ui/table/DataTable";
import { createColumns } from "./AuditLogTableColumns";
import type { AuditLog } from "../auditLogTypes";
import AuditLogDetailModal from "./AuditLogDetailModal";
import { useState } from "react";
import { useAuditLogSelectionStore } from "../stores";

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

  // Selection store
  const { selectedAuditLogs, toggleAuditLog, selectAll } =
    useAuditLogSelectionStore();

  const handleViewDetails = (auditLog: AuditLog) => {
    setSelectedAuditLog(auditLog);
    setIsDetailModalOpen(true);
  };

  const allAuditLogIds = auditLogs.map((auditLog) => auditLog.auditLogId);

  return (
    <>
      <DataTable
        columns={createColumns(
          handleViewDetails,
          selectedAuditLogs,
          toggleAuditLog,
          selectAll,
          allAuditLogIds
        )}
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
