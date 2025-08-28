import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { FileText } from "lucide-react";
import type { OrderStatusSummaryDto } from "../analyticsTypes.ts";

interface OrderStatusChartProps {
  data?: OrderStatusSummaryDto[];
  isLoading?: boolean;
}

const OrderStatusChart = ({
  data = [],
  isLoading = false,
}: OrderStatusChartProps) => {
  const COLORS = {
    Pending: "#f59e0b",
    Processing: "#3b82f6",
    Shipped: "#8b5cf6",
    Delivered: "#10b981",
    Cancelled: "#ef4444",
    Refunded: "#6b7280",
  };

  const chartData = data.map((item) => ({
    name: item.status,
    value: item.count,
    color: COLORS[item.status as keyof typeof COLORS] || "#6b7280",
  }));

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-80 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Order Status
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Distribution of orders by status
          </p>
        </div>
        <FileText className="h-5 w-5 text-slate-600 dark:text-slate-400" />
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${((percent || 0) * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0]?.payload;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-semibold">
                            {data?.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {data?.value} orders
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusChart;
