import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/button/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import { Search, X, SlidersHorizontal, Calendar } from "lucide-react";

interface OrderFiltersProps {
  filters: {
    searchTerm: string;
    statusFilter: string;
    dateRange: {
      startDate: string;
      endDate: string;
    };
    pageNumber: number;
    pageSize: number;
  };
  onFiltersChange: (
    filters: Partial<{
      searchTerm: string;
      statusFilter: string;
      dateRange: {
        startDate: string;
        endDate: string;
      };
      pageNumber: number;
      pageSize: number;
    }>
  ) => void;
  onPageSizeChange: (size: number) => void;
  isLoading?: boolean;
}

const OrderFilters = ({
  filters,
  onFiltersChange,
  onPageSizeChange,
  isLoading = false,
}: OrderFiltersProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(filters.searchTerm);

  // Sync local search term when filters change from outside
  useEffect(() => {
    setLocalSearchTerm(filters.searchTerm);
  }, [filters.searchTerm]);

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value);
  };

  const handleSearchSubmit = () => {
    onFiltersChange({ searchTerm: localSearchTerm });
  };

  const handleClearSearch = () => {
    setLocalSearchTerm("");
    onFiltersChange({ searchTerm: "" });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ statusFilter: value });
  };

  const handleStartDateChange = (value: string) => {
    onFiltersChange({
      dateRange: { ...filters.dateRange, startDate: value },
    });
  };

  const handleEndDateChange = (value: string) => {
    onFiltersChange({
      dateRange: { ...filters.dateRange, endDate: value },
    });
  };

  const activeFiltersCount = [
    filters.searchTerm,
    filters.statusFilter !== "all" ? filters.statusFilter : null,
    filters.dateRange.startDate ? "start-date" : null,
    filters.dateRange.endDate ? "end-date" : null,
  ].filter(Boolean).length;

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-700/50 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
            <SlidersHorizontal className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Filters & Search
            {activeFiltersCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setLocalSearchTerm("");
                onFiltersChange({
                  searchTerm: "",
                  statusFilter: "all",
                  dateRange: { startDate: "", endDate: "" },
                });
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-6">
          {/* Search Section */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">
              Search Orders
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by customer name, order ID, or payment method..."
                value={localSearchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 h-12 text-base border-2 focus:border-primary transition-colors"
              />
              {localSearchTerm && (
                <Button
                  onClick={handleClearSearch}
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {localSearchTerm !== filters.searchTerm && (
              <Button
                onClick={handleSearchSubmit}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? "Searching..." : "Apply Search"}
              </Button>
            )}
          </div>

          {/* Filters Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Status Filter
              </label>
              <Select
                value={filters.statusFilter}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="h-11 border-2 focus:border-primary">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      Pending
                    </div>
                  </SelectItem>
                  <SelectItem value="Processing">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      Processing
                    </div>
                  </SelectItem>
                  <SelectItem value="Shipped">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500" />
                      Shipped
                    </div>
                  </SelectItem>
                  <SelectItem value="Delivered">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      Delivered
                    </div>
                  </SelectItem>
                  <SelectItem value="Cancelled">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      Cancelled
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="date"
                  value={filters.dateRange.startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="pl-10 h-11 border-2 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="date"
                  value={filters.dateRange.endDate}
                  onChange={(e) => handleEndDateChange(e.target.value)}
                  className="pl-10 h-11 border-2 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Items per Page
              </label>
              <Select
                value={filters.pageSize.toString()}
                onValueChange={(value) => onPageSizeChange(Number(value))}
              >
                <SelectTrigger className="h-11 border-2 focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 items</SelectItem>
                  <SelectItem value="25">25 items</SelectItem>
                  <SelectItem value="50">50 items</SelectItem>
                  <SelectItem value="100">100 items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <span className="text-sm font-medium text-muted-foreground">
                Active filters:
              </span>
              {filters.searchTerm && (
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  Search: "{filters.searchTerm}"
                  <Button
                    onClick={handleClearSearch}
                    size="sm"
                    variant="ghost"
                    className="h-4 w-4 p-0 hover:bg-primary/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </span>
              )}
              {filters.statusFilter !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  Status: {filters.statusFilter}
                  <Button
                    onClick={() => handleStatusChange("all")}
                    size="sm"
                    variant="ghost"
                    className="h-4 w-4 p-0 hover:bg-primary/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </span>
              )}
              {filters.dateRange.startDate && (
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  From: {filters.dateRange.startDate}
                  <Button
                    onClick={() => handleStartDateChange("")}
                    size="sm"
                    variant="ghost"
                    className="h-4 w-4 p-0 hover:bg-primary/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </span>
              )}
              {filters.dateRange.endDate && (
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  To: {filters.dateRange.endDate}
                  <Button
                    onClick={() => handleEndDateChange("")}
                    size="sm"
                    variant="ghost"
                    className="h-4 w-4 p-0 hover:bg-primary/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderFilters;
