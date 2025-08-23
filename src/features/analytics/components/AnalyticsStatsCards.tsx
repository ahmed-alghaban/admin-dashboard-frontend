import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { DollarSign, TrendingUp, ShoppingCart, Activity } from "lucide-react";
import type { SalesSummaryDto, OrderStatusSummaryDto } from "../analyticsTypes";

interface AnalyticsStatsCardsProps {
  salesData?: SalesSummaryDto[];
  orderStatusData?: OrderStatusSummaryDto[];
  userGrowthData?: { date: string; count: number }[];
  isLoading?: boolean;
}

const AnalyticsStatsCards = ({
  salesData = [],
  orderStatusData = [],
  userGrowthData = [],
  isLoading = false,
}: AnalyticsStatsCardsProps) => {
  const calculateStats = () => {
    if (!salesData.length) {
      return {
        totalRevenue: 0,
        totalOrders: 0,
        avgOrderValue: 0,
        totalUsers: 0,
      };
    }

    const totalRevenue = salesData.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );
    const totalOrders = salesData.reduce(
      (sum, item) => sum + item.orderCount,
      0
    );
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const totalUsers = userGrowthData.reduce(
      (sum, item) => sum + item.count,
      0
    );

    return { totalRevenue, totalOrders, avgOrderValue, totalUsers };
  };

  const { totalRevenue, totalOrders, avgOrderValue } = calculateStats();

  // Calculate pending orders from status data
  const pendingOrders =
    orderStatusData.find((item) => item.status === "Pending")?.count || 0;

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: "Total sales revenue",
      className: "text-green-600",
    },
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      icon: ShoppingCart,
      description: "Total orders placed",
      className: "text-blue-600",
    },
    {
      title: "Average Order Value",
      value: `$${avgOrderValue.toFixed(2)}`,
      icon: TrendingUp,
      description: "Average order amount",
      className: "text-purple-600",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toString(),
      icon: Activity,
      description: "Orders awaiting processing",
      className: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.className}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{stat.value}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AnalyticsStatsCards;
