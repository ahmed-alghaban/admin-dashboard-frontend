import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { Package, DollarSign, TrendingUp, Clock } from "lucide-react";
import type { Order } from "../orderTypes";

interface OrderStatsCardsProps {
  orders: Order[];
  isLoading?: boolean;
}

const OrderStatsCards = ({
  orders,
  isLoading = false,
}: OrderStatsCardsProps) => {
  const calculateStats = () => {
    if (!orders.length)
      return {
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        avgOrderValue: 0,
      };

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const pendingOrders = orders.filter(
      (order) => order.status === "Pending"
    ).length;
    const avgOrderValue = totalRevenue / totalOrders;

    return { totalOrders, totalRevenue, pendingOrders, avgOrderValue };
  };

  const { totalOrders, totalRevenue, pendingOrders, avgOrderValue } =
    calculateStats();

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

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Total Orders
          </CardTitle>
          <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {totalOrders}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            All time orders
          </p>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Total Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            ${totalRevenue.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            All time revenue
          </p>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Pending Orders
          </CardTitle>
          <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {pendingOrders}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Awaiting processing
          </p>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Average Order Value
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            ${avgOrderValue.toFixed(2)}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Per order average
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderStatsCards;
