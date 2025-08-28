import { Button } from "@/components/ui/button/button";
import { Download, RefreshCw, Filter } from "lucide-react";
import { exportToExcel, formatAuditLogDataForExport } from "@/lib/utils";
import { toast } from "sonner";
import type { AuditLog } from "../auditLogTypes.ts";
import { useAuditLogSelectionStore } from "../stores";

interface AuditLogPageHeaderProps {
  onRefresh: () => void;
  onShowFilters: () => void;
  auditLogs: AuditLog[];
}

const AuditLogPageHeader = ({
  onRefresh,
  onShowFilters,
  auditLogs,
}: AuditLogPageHeaderProps) => {
  const { selectedAuditLogs, getSelectedCount, clearSelection } =
    useAuditLogSelectionStore();

  const handleExport = () => {
    try {
      let dataToExport: AuditLog[];
      let filename: string;

      if (selectedAuditLogs.size > 0) {
        // Export selected audit logs
        dataToExport = auditLogs.filter((auditLog) =>
          selectedAuditLogs.has(auditLog.auditLogId)
        );
        filename = `selected-audit-logs-${new Date().toISOString().split("T")[0]}`;
        toast.success(
          `${dataToExport.length} audit logs exported successfully!`
        );
      } else {
        // Export all audit logs
        dataToExport = auditLogs;
        filename = `audit-logs-${new Date().toISOString().split("T")[0]}`;
        toast.success("All audit logs exported successfully!");
      }

      const formattedData = formatAuditLogDataForExport(dataToExport);
      exportToExcel(formattedData, filename);
    } catch (error) {
      toast.error("Failed to export audit logs");
      console.error("Export error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground">
          Monitor system activities and user actions
        </p>
      </div>
      <div className="flex items-center gap-2">
        {selectedAuditLogs.size > 0 && (
          <>
            <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {getSelectedCount()} selected
            </div>
            <Button variant="outline" size="sm" onClick={clearSelection}>
              Clear Selection
            </Button>
          </>
        )}
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          {selectedAuditLogs.size > 0
            ? `Export Selected (${selectedAuditLogs.size})`
            : "Export All"}
        </Button>
        <Button variant="outline" onClick={onShowFilters}>
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default AuditLogPageHeader;
