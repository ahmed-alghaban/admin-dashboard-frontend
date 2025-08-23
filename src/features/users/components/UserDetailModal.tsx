import { DetailModal } from "@/components/ui/detail-modal";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, Shield } from "lucide-react";
import type { User as UserType } from "../userTypes";

interface UserDetailModalProps {
  user: UserType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const UserDetailModal = ({
  user,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: UserDetailModalProps) => {
  if (!user) return null;

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "Manager":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Viewer":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <DetailModal
      open={open}
      onOpenChange={onOpenChange}
      title="User Details"
      description="View detailed information about this user"
      onEdit={onEdit}
      onDelete={onDelete}
      size="lg"
    >
      <div className="space-y-6">
        {/* User Header */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={user.profileImageUrl}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <AvatarFallback className="text-lg">
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getRoleColor(user.role?.name || "Unknown")}>
                <Shield className="h-3 w-3 mr-1" />
                {user.role?.name || "Unknown"}
              </Badge>
              <Badge className={getStatusColor(user.status === "Active")}>
                {user.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* User Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Phone
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {user.phoneNumber || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Joined
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailModal>
  );
};

export default UserDetailModal;
