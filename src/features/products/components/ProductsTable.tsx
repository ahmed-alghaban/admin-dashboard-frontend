import { DataTable } from "@/components/ui/table/DataTable";
import { createColumns } from "./ProductTableColumns";
import { useProductUIStore, useProductSelectionStore } from "../stores";
import type { Product } from "../productTypes.ts";
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Zustand store for UI state
  const { openEditDrawer } = useProductUIStore();
  const { selectedProducts, toggleProduct, selectAll } =
    useProductSelectionStore();

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

  const allProductIds = products.map((product) => product.productId);

  return (
    <>
      <DataTable
        columns={createColumns(
          handleEditProduct,
          handleDeleteProduct,
          handleViewDetails,
          selectedProducts,
          toggleProduct,
          selectAll,
          allProductIds
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
