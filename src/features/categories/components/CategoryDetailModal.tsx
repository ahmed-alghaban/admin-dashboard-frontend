import { DetailModal } from "@/components/ui/detail-modal";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Package } from "lucide-react";
import type { Category } from "../categoryTypes";

interface CategoryDetailModalProps {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const CategoryDetailModal = ({
  category,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: CategoryDetailModalProps) => {
  if (!category) return null;

  return (
    <DetailModal
      open={open}
      onOpenChange={onOpenChange}
      title="Category Details"
      description="View detailed information about this category"
      onEdit={onEdit}
      onDelete={onDelete}
      size="lg"
    >
      <div className="space-y-6">
        {/* Category Header */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <FolderOpen className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              {category.name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Package className="h-3 w-3 mr-1" />
                Category
              </Badge>
            </div>
          </div>
        </div>

        {/* Category Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FolderOpen className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Name
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {category.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {category.description && (
          <div>
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              {category.description}
            </p>
          </div>
        )}
      </div>
    </DetailModal>
  );
};

export default CategoryDetailModal;
