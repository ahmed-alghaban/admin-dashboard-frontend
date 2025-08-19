import { useState } from "react";
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
  onFiltersChange: (filters: {
    searchTerm: string;
    statusFilter: string;
  }) => void;
}

const UserFilters = ({ onFiltersChange }: UserFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { pageSize, showInactiveUsers, setPageSize, toggleInactiveUsers } =
    useUserPreferencesStore();

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onFiltersChange({ searchTerm: value, statusFilter });
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    onFiltersChange({ searchTerm, statusFilter: value });
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
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Status</label>
            <Select value={statusFilter} onValueChange={handleStatusChange}>
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
              value={pageSize.toString()}
              onValueChange={(value) => setPageSize(Number(value))}
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
