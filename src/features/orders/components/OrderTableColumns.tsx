import type { ColumnDef } from "@tanstack/react-table";
import type { Order, OrderItem } from "../orderTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import { Button } from "@/components/ui/button/button";
import { MoreHorizontal, Edit, Eye } from "lucide-react";

export const createColumns = (
  onEdit: (order: Order) => void
): ColumnDef<Order>[] => [
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm text-muted-foreground">
        {(row.getValue("orderId") as string).slice(0, 8)}...
      </div>
    ),
  },
  {
    accessorKey: "userFullName",
    header: "Customer",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("userFullName") as string}
      </div>
    ),
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("orderDate") as string);
      return (
        <div className="text-sm text-muted-foreground">
          {date.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = row.getValue("totalAmount") as number;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusColor = (status: string) => {
        switch (status) {
          case "Pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
          case "Processing":
            return "bg-blue-100 text-blue-800 border-blue-200";
          case "Shipped":
            return "bg-purple-100 text-purple-800 border-purple-200";
          case "Delivered":
            return "bg-green-100 text-green-800 border-green-200";
          case "Cancelled":
            return "bg-red-100 text-red-800 border-red-200";
          default:
            return "bg-gray-100 text-gray-800 border-gray-200";
        }
      };

      return (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${getStatusColor(
            status
          )}`}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("paymentMethod") as string}</div>
    ),
  },
  {
    accessorKey: "orderItems",
    header: "Items",
    cell: ({ row }) => {
      const items = row.getValue("orderItems") as OrderItem[];
      return (
        <div className="text-sm text-muted-foreground">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </div>
      );
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
              Update Status
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
