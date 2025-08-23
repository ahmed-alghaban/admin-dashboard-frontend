import { DetailModal } from "@/components/ui/detail-modal";
import { Badge } from "@/components/ui/badge";
import { Package, DollarSign, Tag } from "lucide-react";
import type { Product } from "../productTypes";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProductDetailModal = ({
  product,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: ProductDetailModalProps) => {
  if (!product) return null;

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <DetailModal
      open={open}
      onOpenChange={onOpenChange}
      title="Product Details"
      description="View detailed information about this product"
      onEdit={onEdit}
      onDelete={onDelete}
      size="lg"
    >
      <div className="space-y-6">
        {/* Product Header */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Package className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              {product.productName}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">{product.sku}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getStatusColor(product.isActive)}>
                {product.isActive ? "Active" : "Inactive"}
              </Badge>
              {product.category && (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  <Tag className="h-3 w-3 mr-1" />
                  {product.category.name}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Product Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Package className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  SKU
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {product.sku}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Price
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Tag className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Category
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {product.category?.name || "No Category"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Package className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Stock Quantity
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {product.quantityInStock}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div>
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              {product.description}
            </p>
          </div>
        )}
      </div>
    </DetailModal>
  );
};

export default ProductDetailModal;
