import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Button } from "@/components/ui/button/button";
import { Calendar, Filter } from "lucide-react";
import { useState } from "react";
import {
  analyticsFiltersSchema,
  type AnalyticsFiltersSchema,
} from "../schemas";

interface AnalyticsFiltersProps {
  onFiltersChange: (filters: {
    startDate?: string;
    endDate?: string;
    timeframe: string;
  }) => void;
  isLoading?: boolean;
}

const AnalyticsFilters = ({
  onFiltersChange,
  isLoading = false,
}: AnalyticsFiltersProps) => {
  const [timeframe, setTimeframe] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApplyFilters = () => {
    const filterData: AnalyticsFiltersSchema = {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      timeframe: timeframe as "daily" | "weekly" | "monthly",
      limit: 5, // Default limit
    };

    // Validate filters
    const validationResult = analyticsFiltersSchema.safeParse(filterData);
    if (!validationResult.success) {
      console.error("Filter validation failed:", validationResult.error);
      return;
    }

    onFiltersChange(validationResult.data);
  };

  const handleQuickFilter = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);

    onFiltersChange({
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
      timeframe,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-semibold">
            Analytics Filters
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Timeframe Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Timeframe</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              disabled={isLoading}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Apply Button */}
          <div className="space-y-2">
            <label className="text-sm font-medium">&nbsp;</label>
            <Button
              onClick={handleApplyFilters}
              disabled={isLoading}
              className="w-full"
            >
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mt-4 pt-4 border-t">
          <label className="text-sm font-medium mb-2 block">
            Quick Filters
          </label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickFilter(7)}
              disabled={isLoading}
            >
              Last 7 Days
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickFilter(30)}
              disabled={isLoading}
            >
              Last 30 Days
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickFilter(90)}
              disabled={isLoading}
            >
              Last 90 Days
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStartDate("");
                setEndDate("");
                onFiltersChange({ timeframe });
              }}
              disabled={isLoading}
            >
              All Time
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsFilters;
