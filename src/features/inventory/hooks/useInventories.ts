import { useQuery } from "@tanstack/react-query";
import { getInventories } from "../inventoryService";
import type { PaginationResult } from "@/lib/types";
import type { Inventory } from "../inventoryTypes";

export const useInventories = (
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  return useQuery<PaginationResult<Inventory>>({
    queryKey: ["inventories", pageNumber, pageSize],
    queryFn: () => getInventories(pageNumber, pageSize),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
