import { Button } from "@/components/ui/button/button";
import { Download, RefreshCw, Filter } from "lucide-react";

interface AuditLogPageHeaderProps {
  onExport: () => void;
  onRefresh: () => void;
  onShowFilters: () => void;
}

const AuditLogPageHeader = ({
  onExport,
  onRefresh,
  onShowFilters,
}: AuditLogPageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground">
          Monitor system activities and user actions
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onShowFilters}>
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button variant="outline" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
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
