import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "../userTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import { Button } from "@/components/ui/button/button";
import { MoreHorizontal, Edit, User as UserIcon, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const createColumns = (
  onEdit: (user: User) => void,
  onDelete: (user: User) => void,
  onViewDetails: (user: User) => void,
  selectedUsers: Set<string>,
  onToggleUser: (userId: string) => void,
  onSelectAll: (userIds: string[]) => void,
  allUserIds: string[]
): ColumnDef<User>[] => [
  {
    id: "select",
    header: () => (
      <Checkbox
        checked={
          allUserIds.length > 0 && selectedUsers.size === allUserIds.length
        }
        onCheckedChange={(checked) => {
          onSelectAll(checked ? allUserIds : []);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedUsers.has(row.original.userId)}
        onCheckedChange={() => onToggleUser(row.original.userId)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("firstName")}</div>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status === "Active"
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-destructive/10 text-destructive border border-destructive/20"
          }`}
        >
          {status}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(user)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewDetails(user)}>
              <UserIcon className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(user)}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
