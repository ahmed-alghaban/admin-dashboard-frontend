import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/form/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import { Search } from "lucide-react";

interface ProductFiltersProps {
  filters: {
    searchTerm: string;
    categoryFilter: string;
    statusFilter: string;
    pageNumber: number;
    pageSize: number;
  };
  onFiltersChange: (
    filters: Partial<{
      searchTerm: string;
      categoryFilter: string;
      statusFilter: string;
      pageNumber: number;
      pageSize: number;
    }>
  ) => void;
  onPageSizeChange: (size: number) => void;
  isLoading?: boolean;
}

const ProductFilters = ({
  filters,
  onFiltersChange,
  onPageSizeChange,
  isLoading = false,
}: ProductFiltersProps) => {
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

  const handleCategoryChange = (value: string) => {
    onFiltersChange({ categoryFilter: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Search
              {filters.searchTerm && (
                <span className="ml-2 text-xs text-muted-foreground">
                  (Active: "{filters.searchTerm}")
                </span>
              )}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={localSearchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 pr-20"
              />
              <div className="absolute right-1 top-1 flex gap-1">
                <Button
                  onClick={handleSearchSubmit}
                  size="sm"
                  disabled={isLoading}
                  className="h-7 px-2 text-xs"
                >
                  {isLoading ? "..." : "Go"}
                </Button>
                {filters.searchTerm && (
                  <Button
                    onClick={handleClearSearch}
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-xs"
                  >
                    ×
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={filters.categoryFilter}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {/* TODO: Add dynamic categories from API */}
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="books">Books</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={filters.statusFilter}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Page Size</label>
            <Select
              value={filters.pageSize.toString()}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 per page</SelectItem>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
