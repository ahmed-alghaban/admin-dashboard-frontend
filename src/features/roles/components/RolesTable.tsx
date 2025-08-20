import React from "react";
import { useRoles } from "../hooks/userRoles";
import { DataTable } from "@/components/ui/table/DataTable";
import RoleColumns from "./RoleColumns";
import { Skeleton } from "@/components/ui/skeleton/skeleton";

const RolesTable = () => {
  const { data: roles, isLoading, error } = useRoles();

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <div className="text-destructive">
            Error loading roles: {error.message}
          </div>
        </div>
      </div>
    );
  }

  // Ensure roles is an array
  const rolesArray = Array.isArray(roles) ? roles : [];

  return (
    <div className="w-full">
      <DataTable
        columns={RoleColumns()}
        data={rolesArray}
        className="max-w-4xl mx-auto"
      />
    </div>
  );
};

export default RolesTable;
