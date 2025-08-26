import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Components
import {
  AuditLogPageHeader,
  AuditLogStatsCards,
  AuditLogsTable,
} from "../components";

// Hooks
import { useAuditLogFilters } from "../hooks/useAuditLogFilters";

const AuditLogPage = () => {
  const queryClient = useQueryClient();
  const {
    auditLogs,
    isLoading,
    isFetching,
    error,
    setPage,
    totalCount,
    totalPages,
    currentPage,
    pageSize,
  } = useAuditLogFilters();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["audit-logs"] });
  };

  const handleShowFilters = () => {
    // You can implement filter drawer functionality here
    toast.info("Filter functionality (not implemented yet)");
  };

  // Show full page skeleton only on initial load
  if (isLoading && !auditLogs.length) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-destructive mb-2">Error loading audit logs</div>
          <button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["audit-logs"] })
            }
            className="text-sm text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AuditLogPageHeader
        onRefresh={handleRefresh}
        onShowFilters={handleShowFilters}
        auditLogs={auditLogs}
      />

      <AuditLogStatsCards auditLogs={auditLogs} />

      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-slate-200">
            Audit Logs ({totalCount})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AuditLogsTable
            auditLogs={auditLogs}
            currentPage={currentPage}
            totalCount={totalCount}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            isLoading={isFetching}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogPage;
