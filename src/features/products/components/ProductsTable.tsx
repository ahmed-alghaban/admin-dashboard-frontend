import { DataTable } from "@/components/ui/table/DataTable";
import { createColumns } from "./ProductTableColumns";
import { useProductUIStore } from "../stores";
import type { Product } from "../productTypes";
import ProductDetailModal from "./ProductDetailModal";
import { useState } from "react";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleEditProduct = (product: Product) => {
    openEditDrawer(product.productId);
  };

  const handleDeleteProduct = async (product: Product) => {
    // TODO: Implement delete functionality
    console.log("Delete product:", product.productId);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <DataTable
        columns={createColumns(
          handleEditProduct,
          handleDeleteProduct,
          handleViewDetails
        )}
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

      <ProductDetailModal
        product={selectedProduct}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        onEdit={() => {
          if (selectedProduct) {
            handleEditProduct(selectedProduct);
            setIsDetailModalOpen(false);
          }
        }}
        onDelete={() => {
          if (selectedProduct) {
            handleDeleteProduct(selectedProduct);
            setIsDetailModalOpen(false);
          }
        }}
      />
    </>
  );
};

export default ProductsTable;
