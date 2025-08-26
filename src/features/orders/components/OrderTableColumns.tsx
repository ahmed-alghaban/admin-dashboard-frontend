import type { ColumnDef } from "@tanstack/react-table";
import type { Order } from "../orderTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import { Button } from "@/components/ui/button/button";
import { MoreHorizontal, Edit, Eye, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const createColumns = (
  onEdit: (order: Order) => void,
  onDelete: (order: Order) => void,
  onViewDetails: (order: Order) => void,
  selectedOrders: Set<string>,
  onToggleOrder: (orderId: string) => void,
  onSelectAll: (orderIds: string[]) => void,
  allOrderIds: string[]
): ColumnDef<Order>[] => [
  {
    id: "select",
    header: () => (
      <Checkbox
        checked={
          allOrderIds.length > 0 && selectedOrders.size === allOrderIds.length
        }
        onCheckedChange={(checked) => {
          onSelectAll(checked ? allOrderIds : []);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedOrders.has(row.original.orderId)}
        onCheckedChange={() => onToggleOrder(row.original.orderId)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="font-medium">#{row.getValue("orderId")}</div>
    ),
  },
  {
    accessorKey: "userFullName",
    header: "Customer",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("userFullName")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusColor = (status: string) => {
        switch (status) {
          case "Pending":
            return "bg-yellow-100 text-yellow-800 border border-yellow-200";
          case "Processing":
            return "bg-blue-100 text-blue-800 border border-blue-200";
          case "Shipped":
            return "bg-purple-100 text-purple-800 border border-purple-200";
          case "Delivered":
            return "bg-green-100 text-green-800 border border-green-200";
          case "Cancelled":
            return "bg-red-100 text-red-800 border border-red-200";
          default:
            return "bg-gray-100 text-gray-800 border border-gray-200";
        }
      };

      return (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(status)}`}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => {
      const amount = row.getValue("totalAmount") as number;
      return <div className="font-medium">${amount?.toFixed(2) || "0.00"}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(order)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewDetails(order)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(order)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
