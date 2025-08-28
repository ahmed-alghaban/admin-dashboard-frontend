import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import {
  Package,
  AlertTriangle,
  TrendingDown,
  CheckCircle,
} from "lucide-react";
import type { Inventory } from "../inventoryTypes.ts";

interface InventoryStatsCardsProps {
  inventories: Inventory[];
}

const InventoryStatsCards = ({ inventories }: InventoryStatsCardsProps) => {
  const totalItems = inventories.length;
  const lowStockItems = inventories.filter(
    (inventory) =>
      inventory.quantityAvailable <= inventory.reorderLevel &&
      inventory.quantityAvailable > 0
  ).length;
  const outOfStockItems = inventories.filter(
    (inventory) => inventory.quantityAvailable === 0
  ).length;
  const normalStockItems = inventories.filter(
    (inventory) => inventory.quantityAvailable > inventory.reorderLevel
  ).length;

  const stats = [
    {
      title: "Total Inventory Items",
      value: totalItems,
      icon: Package,
      className: "text-blue-600",
    },
    {
      title: "Low Stock Items",
      value: lowStockItems,
      icon: AlertTriangle,
      className: "text-orange-600",
    },
    {
      title: "Out of Stock",
      value: outOfStockItems,
      icon: TrendingDown,
      className: "text-red-600",
    },
    {
      title: "Normal Stock",
      value: normalStockItems,
      icon: CheckCircle,
      className: "text-green-600",
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
                {stat.title === "Total Inventory Items"
                  ? "Items in inventory system"
                  : "Based on reorder levels"}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default InventoryStatsCards;
