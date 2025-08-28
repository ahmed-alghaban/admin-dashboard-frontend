import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Package, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import type { Product } from "../productTypes.ts";

interface ProductStatsCardsProps {
  products: Product[];
}

const ProductStatsCards = ({ products }: ProductStatsCardsProps) => {
  const totalProducts = products.length;
  const activeProducts = products.filter((product) => product.isActive).length;
  const inactiveProducts = products.filter(
    (product) => !product.isActive
  ).length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.quantityInStock,
    0
  );

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      className: "text-blue-600",
    },
    {
      title: "Active Products",
      value: activeProducts,
      icon: TrendingUp,
      className: "text-green-600",
    },
    {
      title: "Inactive Products",
      value: inactiveProducts,
      icon: AlertTriangle,
      className: "text-orange-600",
    },
    {
      title: "Total Inventory Value",
      value: `$${totalValue.toLocaleString()}`,
      icon: DollarSign,
      className: "text-purple-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.className}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                {stat.value}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {stat.title === "Total Inventory Value"
                  ? "Based on current stock and prices"
                  : "Products in system"}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductStatsCards;
