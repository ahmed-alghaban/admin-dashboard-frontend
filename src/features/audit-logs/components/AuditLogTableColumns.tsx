import type { ColumnDef } from "@tanstack/react-table";
import { Activity, Eye } from "lucide-react";
import type { AuditLog } from "../auditLogTypes";

export const createColumns = (
  onViewDetails: (auditLog: AuditLog) => void
): ColumnDef<AuditLog>[] => [
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
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp") as string;
      return (
        <div className="text-sm">
          <div>{new Date(timestamp).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const auditLog = row.original;

      return (
        <div className="flex items-center gap-2">
          <button
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="View Details"
            onClick={() => onViewDetails(auditLog)}
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      );
    },
  },
];
