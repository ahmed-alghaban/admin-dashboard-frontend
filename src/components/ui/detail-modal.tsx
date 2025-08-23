import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { Button } from "@/components/ui/button/button";
import { Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export const DetailModal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  onEdit,
  onDelete,
  showActions = true,
  size = "lg",
}: DetailModalProps) => {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-slate-700/50 shadow-2xl",
          sizeClasses[size]
        )}
      >
        <DialogHeader className="space-y-3">
          <div>
            <DialogTitle className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {description}
              </DialogDescription>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-4">{children}</div>

        {showActions && (onEdit || onDelete) && (
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={onDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
