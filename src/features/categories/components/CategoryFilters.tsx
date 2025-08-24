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
import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";

interface CategoryFiltersProps {
  filters: {
    searchTerm: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
  onFiltersChange: (filters: Partial<CategoryFiltersProps["filters"]>) => void;
  isLoading: boolean;
}

const CategoryFilters = ({
  filters,
  onFiltersChange,
  isLoading,
}: CategoryFiltersProps) => {
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

  const handleSortByChange = (value: string) => {
    onFiltersChange({ sortBy: value });
  };

  const handleSortOrderChange = (value: "asc" | "desc") => {
    onFiltersChange({ sortOrder: value });
  };

  const activeFiltersCount = [
    filters.searchTerm,
    filters.sortBy !== "name" ? filters.sortBy : null,
    filters.sortOrder !== "asc" ? filters.sortOrder : null,
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
                  sortBy: "name",
                  sortOrder: "asc",
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
              Search Categories
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or description..."
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

          {/* Sorting Section */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Sort by Field
              </label>
              <Select value={filters.sortBy} onValueChange={handleSortByChange}>
                <SelectTrigger className="h-11 border-2 focus:border-primary">
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      Name
                    </div>
                  </SelectItem>
                  <SelectItem value="description">
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      Description
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Sort Order
              </label>
              <Select
                value={filters.sortOrder}
                onValueChange={handleSortOrderChange}
              >
                <SelectTrigger className="h-11 border-2 focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      Ascending (A-Z)
                    </div>
                  </SelectItem>
                  <SelectItem value="desc">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-orange-500" />
                      Descending (Z-A)
                    </div>
                  </SelectItem>
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
              {filters.sortBy !== "name" && (
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  Sort: {filters.sortBy}
                  <Button
                    onClick={() => handleSortByChange("name")}
                    size="sm"
                    variant="ghost"
                    className="h-4 w-4 p-0 hover:bg-primary/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </span>
              )}
              {filters.sortOrder !== "asc" && (
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  Order:{" "}
                  {filters.sortOrder === "desc" ? "Descending" : "Ascending"}
                  <Button
                    onClick={() => handleSortOrderChange("asc")}
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

export default CategoryFilters;
