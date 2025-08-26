import type { ColumnDef } from "@tanstack/react-table";
import type { Category } from "../categoryTypes";
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
  onEdit: (category: Category) => void,
  onDelete: (category: Category) => void,
  onViewDetails: (category: Category) => void,
  selectedCategories: Set<string>,
  onToggleCategory: (categoryId: string) => void,
  onSelectAll: (categoryIds: string[]) => void,
  allCategoryIds: string[]
): ColumnDef<Category>[] => [
  {
    id: "select",
    header: () => (
      <Checkbox
        checked={
          allCategoryIds.length > 0 &&
          selectedCategories.size === allCategoryIds.length
        }
        onCheckedChange={(checked) => {
          onSelectAll(checked ? allCategoryIds : []);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedCategories.has(row.original.categoryId)}
        onCheckedChange={() => onToggleCategory(row.original.categoryId)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.getValue("description") || "No description"}
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
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(category)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewDetails(category)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(category)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
