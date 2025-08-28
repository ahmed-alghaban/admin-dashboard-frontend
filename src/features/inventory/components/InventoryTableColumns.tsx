import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button/button";
import { MoreHorizontal, Edit, Package } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import type { Inventory } from "../inventoryTypes.ts";

export const createColumns = (
  onEdit: (inventory: Inventory) => void
): ColumnDef<Inventory>[] => [
  {
    accessorKey: "inventoryId",
    header: "Inventory ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("inventoryId")}</div>
    ),
  },
  {
    accessorKey: "productId",
    header: "Product ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("productId")}</div>
    ),
  },
  {
    accessorKey: "quantityAvailable",
    header: "Available Quantity",
    cell: ({ row }) => {
      const quantity = row.getValue("quantityAvailable") as number;
      const reorderLevel = row.original.reorderLevel;

      return (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            quantity === 0
              ? "bg-red-100 text-red-800 border border-red-200"
              : quantity <= reorderLevel
                ? "bg-orange-100 text-orange-800 border border-orange-200"
                : "bg-green-100 text-green-800 border border-green-200"
          }`}
        >
          {quantity}
        </div>
      );
    },
  },
  {
    accessorKey: "reorderLevel",
    header: "Reorder Level",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("reorderLevel")}</div>
    ),
  },
  {
    accessorKey: "lastRestockedAt",
    header: "Last Restocked",
    cell: ({ row }) => {
      const lastRestockedAt = row.getValue("lastRestockedAt") as string;
      if (!lastRestockedAt) {
        return <div className="text-sm text-gray-500">Never</div>;
      }
      return (
        <div className="text-sm">
          {new Date(lastRestockedAt).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "stockStatus",
    header: "Stock Status",
    cell: ({ row }) => {
      const quantity = row.original.quantityAvailable;
      const reorderLevel = row.original.reorderLevel;

      let status = "Normal";
      let className = "bg-green-100 text-green-800 border border-green-200";

      if (quantity === 0) {
        status = "Out of Stock";
        className = "bg-red-100 text-red-800 border border-red-200";
      } else if (quantity <= reorderLevel) {
        status = "Low Stock";
        className = "bg-orange-100 text-orange-800 border border-orange-200";
      }

      return (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
        >
          {status}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const inventory = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(inventory)}>
              <Edit className="mr-2 h-4 w-4" />
              Update Quantity
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Package className="mr-2 h-4 w-4" />
              View Product Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
