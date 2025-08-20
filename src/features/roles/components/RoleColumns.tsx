import type { ColumnDef } from "@tanstack/react-table";

interface Role {
  roleId: string;
  name: string;
  description: string;
}

const RoleColumns = (): ColumnDef<Role>[] => {
  return [
    {
      accessorKey: "name",
      header: "Role Name",
      cell: ({ row }) => (
        <div className="font-semibold text-foreground">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-muted-foreground max-w-md">
          {row.getValue("description")}
        </div>
      ),
    },
  ];
};

export default RoleColumns;
