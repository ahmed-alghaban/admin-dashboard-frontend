import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp } from "lucide-react";
import type { SalesSummaryDto } from "../analyticsTypes";

interface SalesChartProps {
  data?: SalesSummaryDto[];
  isLoading?: boolean;
  timeframe?: string;
}

const SalesChart = ({ data = [], isLoading = false, timeframe = "daily" }: SalesChartProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    switch (timeframe) {
      case "daily":
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      case "weekly":
        return `Week ${date.getDate()}`;
      case "monthly":
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      default:
        return date.toLocaleDateString();
    }
  };

  const chartData = data.map((item) => ({
    date: formatDate(item.date),
    revenue: item.totalAmount,
    orders: item.orderCount,
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
          <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">Sales Overview</CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Revenue and order trends over time
          </p>
        </div>
        <TrendingUp className="h-5 w-5 text-slate-600 dark:text-slate-400" />
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                className="text-xs"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-white/20 dark:border-slate-700/50 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 p-2 shadow-xl">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-slate-500 dark:text-slate-400">
                              Revenue
                            </span>
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              ${payload[0]?.value?.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-slate-500 dark:text-slate-400">
                              Orders
                            </span>
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              {payload[1]?.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#revenueGradient)"
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                name="Orders"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
