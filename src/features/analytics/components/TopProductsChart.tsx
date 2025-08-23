import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Package } from "lucide-react";
import type { TopProductDto } from "../analyticsTypes";

interface TopProductsChartProps {
  data?: TopProductDto[];
  isLoading?: boolean;
}

const TopProductsChart = ({ data = [], isLoading = false }: TopProductsChartProps) => {
  const chartData = data.map((item) => ({
    name: item.productName.length > 15 
      ? `${item.productName.substring(0, 15)}...` 
      : item.productName,
    revenue: item.totalRevenue,
    quantity: item.quantitySold,
    fullName: item.productName,
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
          <p className="text-sm text-muted-foreground">
            Best performing products by revenue
          </p>
        </div>
        <Package className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                type="number"
                className="text-xs"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <YAxis
                type="category"
                dataKey="name"
                className="text-xs"
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0]?.payload;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-semibold">
                            {data?.fullName}
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Revenue
                              </span>
                              <span className="font-bold text-muted-foreground">
                                ${data?.revenue?.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Quantity
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {data?.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="revenue"
                fill="#8b5cf6"
                radius={[0, 4, 4, 0]}
                name="Revenue"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProductsChart;
