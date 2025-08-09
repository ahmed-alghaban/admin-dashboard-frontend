import type { ColumnDef, SortingState } from "@tanstack/react-table";

export interface ConfirmDialogProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
  triggerText?: string;
}

export type Trend = {
  value: number;           // e.g., +12.5 or -7.3
  label?: string;          // e.g., "vs last week"
};

export type StatsCardProps = {
  title: string;           // "Total Sales"
  value: string | number;  // "SAR 12,340" or 12340
  subtitle?: string;       // "This month"
  icon?: React.ReactNode;  // <TrendingUp className="w-5 h-5" />
  trend?: Trend;           // { value: 12.5, label: "vs last week" }
  className?: string;      // extra Tailwind if needed
};

export type SideDrawerProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  trigger?: React.ReactNode;          // optional trigger (e.g., a Button)
  side?: "right" | "left" | "top" | "bottom";
  children: React.ReactNode;          // the content (forms, details, etc.)
  widthClassName?: string;            // override width (e.g., "sm:max-w-md")
};

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  emptyMessage?: string;

  // server-side sorting
  manualSorting?: boolean;
  onSortingChange?: (sorting: SortingState) => void;
  sorting?: SortingState;

  // server-side pagination
  manualPagination?: boolean;
  page?: number;          // 1-based
  pageSize?: number;
  total?: number;         // total items
  onPageChange?: (page: number) => void;

  className?: string;
};
