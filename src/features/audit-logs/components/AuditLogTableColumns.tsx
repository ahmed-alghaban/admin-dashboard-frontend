import type { ColumnDef } from "@tanstack/react-table";
import { Activity, Eye } from "lucide-react";
import type { AuditLog } from "../auditLogTypes.ts";
import { Checkbox } from "@/components/ui/checkbox";

export const createColumns = (
  onViewDetails: (auditLog: AuditLog) => void,
  selectedAuditLogs: Set<string>,
  onToggleAuditLog: (auditLogId: string) => void,
  onSelectAll: (auditLogIds: string[]) => void,
  allAuditLogIds: string[]
): ColumnDef<AuditLog>[] => [
  {
    id: "select",
    header: () => (
      <Checkbox
        checked={
          allAuditLogIds.length > 0 &&
          selectedAuditLogs.size === allAuditLogIds.length
        }
        onCheckedChange={(checked) => {
          onSelectAll(checked ? allAuditLogIds : []);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedAuditLogs.has(row.original.auditLogId)}
        onCheckedChange={() => onToggleAuditLog(row.original.auditLogId)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "actionType",
    header: "Action",
    cell: ({ row }) => {
      const actionType = row.getValue("actionType") as string;

      const getActionColor = (action: string) => {
        switch (action) {
          case "Create":
            return "bg-green-100 text-green-800 border border-green-200";
          case "Update":
            return "bg-blue-100 text-blue-800 border border-blue-200";
          case "Delete":
            return "bg-red-100 text-red-800 border border-red-200";
          case "Login":
            return "bg-purple-100 text-purple-800 border border-purple-200";
          case "Logout":
            return "bg-gray-100 text-gray-800 border border-gray-200";
          case "View":
            return "bg-yellow-100 text-yellow-800 border border-yellow-200";
          case "Export":
            return "bg-indigo-100 text-indigo-800 border border-indigo-200";
          case "Import":
            return "bg-pink-100 text-pink-800 border border-pink-200";
          default:
            return "bg-gray-100 text-gray-800 border border-gray-200";
        }
      };

      return (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getActionColor(actionType)}`}
        >
          <Activity className="mr-1 h-3 w-3" />
          {actionType}
        </div>
      );
    },
  },
  {
    accessorKey: "entityName",
    header: "Entity",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("entityName")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.getValue("ipAddress")}
      </div>
    ),
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp") as string;
      return (
        <div className="text-sm text-muted-foreground">
          {timestamp ? new Date(timestamp).toLocaleString() : ""}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewDetails(row.original)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
