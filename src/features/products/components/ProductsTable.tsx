import { DataTable } from "@/components/ui/table/DataTable";
import { createColumns } from "./ProductTableColumns";
import { useProductUIStore } from "../stores";
import type { Product } from "../productTypes";

interface ProductsTableProps {
  products: Product[];
  currentPage: number;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const ProductsTable = ({
  products,
  currentPage,
  totalCount,
  totalPages,
  pageSize,
  onPageChange,
  isLoading = false,
}: ProductsTableProps) => {
  const { openEditDrawer } = useProductUIStore();

  const handleEditProduct = (product: Product) => {
    openEditDrawer(product.productId);
  };

  const handleDeleteProduct = async (product: Product) => {
    // TODO: Implement delete functionality
    console.log("Delete product:", product.productId);
  };

  return (
    <DataTable
      columns={createColumns(handleEditProduct, handleDeleteProduct)}
      data={products}
      loading={isLoading}
      emptyMessage="No products found."
      manualPagination={true}
      page={currentPage}
      pageSize={pageSize}
      total={totalCount}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default ProductsTable;
