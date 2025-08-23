import { DetailModal } from "@/components/ui/detail-modal";
import { Badge } from "@/components/ui/badge";
import { Calendar, Activity, User, Globe, FileText, Clock } from "lucide-react";
import type { AuditLog } from "../auditLogTypes";

interface AuditLogDetailModalProps {
  auditLog: AuditLog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const AuditLogDetailModal = ({
  auditLog,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: AuditLogDetailModalProps) => {
  if (!auditLog) return null;

  const getActionColor = (action: string) => {
    switch (action) {
      case "Create":
        return "bg-green-100 text-green-800 border-green-200";
      case "Update":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delete":
        return "bg-red-100 text-red-800 border-red-200";
      case "Login":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Logout":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "View":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Export":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "Import":
        return "bg-pink-100 text-pink-800 border-pink-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <DetailModal
      open={open}
      onOpenChange={onOpenChange}
      title="Audit Log Details"
      description="View detailed information about this audit log entry"
      onEdit={onEdit}
      onDelete={onDelete}
      showActions={false}
      size="lg"
    >
      <div className="space-y-6">
        {/* Audit Log Header */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              {auditLog.actionType} Action
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getActionColor(auditLog.actionType)}>
                <Activity className="h-3 w-3 mr-1" />
                {auditLog.actionType}
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <FileText className="h-3 w-3 mr-1" />
                {auditLog.entityName}
              </Badge>
            </div>
          </div>
        </div>

        {/* Audit Log Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  User ID
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
                  {auditLog.userId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  IP Address
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
                  {auditLog.ipAddress}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Entity
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {auditLog.entityName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  IP Address
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
                  {auditLog.ipAddress}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Date
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {new Date(auditLog.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Time
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {new Date(auditLog.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Activity className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Action Type
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {auditLog.actionType}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {auditLog.description && (
          <div>
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              {auditLog.description}
            </p>
          </div>
        )}
      </div>
    </DetailModal>
  );
};

export default AuditLogDetailModal;
