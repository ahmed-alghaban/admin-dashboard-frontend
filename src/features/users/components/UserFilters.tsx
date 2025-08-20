import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Input } from "@/components/ui/form/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import { Button } from "@/components/ui/button/button";
import { Filter, Search } from "lucide-react";
import { useUserPreferencesStore } from "../store";

interface UserFiltersProps {
  filters: {
    searchTerm: string;
    statusFilter: string;
    pageNumber: number;
    pageSize: number;
  };
  onFiltersChange: (
    filters: Partial<{
      searchTerm: string;
      statusFilter: string;
      pageNumber: number;
      pageSize: number;
    }>
  ) => void;
  onPageSizeChange: (size: number) => void;
  isLoading?: boolean;
}

const UserFilters = ({
  filters,
  onFiltersChange,
  onPageSizeChange,
  isLoading = false,
}: UserFiltersProps) => {
  const { showInactiveUsers, toggleInactiveUsers } = useUserPreferencesStore();

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

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-4 w-4" />
          Filters & Search
        </CardTitle>
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
                placeholder="Search users..."
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
            <label className="text-sm font-medium">Status</label>
            <Select
              value={filters.statusFilter}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
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
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="25">25 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
                <SelectItem value="100">100 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Show Inactive</label>
            <Button
              variant={showInactiveUsers ? "default" : "outline"}
              size="sm"
              onClick={toggleInactiveUsers}
              className="w-full"
            >
              {showInactiveUsers ? "Hide" : "Show"} Inactive
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserFilters;
