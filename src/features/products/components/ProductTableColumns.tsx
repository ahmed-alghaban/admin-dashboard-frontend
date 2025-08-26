import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "../productTypes";
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
  onEdit: (product: Product) => void,
  onDelete: (product: Product) => void,
  onViewDetails: (product: Product) => void,
  selectedProducts: Set<string>,
  onToggleProduct: (productId: string) => void,
  onSelectAll: (productIds: string[]) => void,
  allProductIds: string[]
): ColumnDef<Product>[] => [
  {
    id: "select",
    header: () => (
      <Checkbox
        checked={
          allProductIds.length > 0 &&
          selectedProducts.size === allProductIds.length
        }
        onCheckedChange={(checked) => {
          onSelectAll(checked ? allProductIds : []);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedProducts.has(row.original.productId)}
        onCheckedChange={() => onToggleProduct(row.original.productId)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("productName")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return <div className="font-medium">${price?.toFixed(2) || "0.00"}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <div className="text-sm text-muted-foreground">
          {category?.name || "No Category"}
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.getValue("sku") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            isActive
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-destructive/10 text-destructive border border-destructive/20"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(product)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewDetails(product)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(product)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
