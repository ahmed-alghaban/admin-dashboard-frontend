import { DataTable } from "@/components/ui/table/DataTable";
import { createColumns } from "./InventoryTableColumns";
import { useInventoryUIStore } from "../stores";
import type { Inventory } from "../inventoryTypes.ts";

interface InventoriesTableProps {
  inventories: Inventory[];
  currentPage: number;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const InventoriesTable = ({
  inventories,
  currentPage,
  totalCount,
  totalPages,
  pageSize,
  onPageChange,
  isLoading = false,
}: InventoriesTableProps) => {
  const { openEditDrawer } = useInventoryUIStore();

  const handleEditInventory = (inventory: Inventory) => {
    openEditDrawer(inventory);
  };

  return (
    <DataTable
      columns={createColumns(handleEditInventory)}
      data={inventories}
      loading={isLoading}
      emptyMessage="No inventory items found."
      manualPagination={true}
      page={currentPage}
      pageSize={pageSize}
      total={totalCount}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default InventoriesTable;
