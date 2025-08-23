import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { Folder, TrendingUp, TrendingDown, Activity } from "lucide-react";

interface CategoryStatsCardsProps {
  totalCategories: number;
  isLoading: boolean;
}

const CategoryStatsCards = ({
  totalCategories,
  isLoading,
}: CategoryStatsCardsProps) => {
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
            Total Categories
          </CardTitle>
          <Folder className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {totalCategories}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            All categories in the system
          </p>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Active Categories
          </CardTitle>
          <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {totalCategories}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Categories with products
          </p>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Growth
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            +12%
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            From last month
          </p>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Empty Categories
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            0
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Categories without products
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryStatsCards;
