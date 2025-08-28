import { useQuery } from "@tanstack/react-query";
import { getOrders, getOrderById } from "../orderService.ts";
import type { PaginatedOrdersResponse } from "../orderTypes.ts";

export const useOrders = (
  pageNumber: number = 1,
  pageSize: number = 10,
  searchTerm?: string
) => {
  return useQuery<PaginatedOrdersResponse>({
    queryKey: ["orders", pageNumber, pageSize, searchTerm],
    queryFn: () => getOrders(pageNumber, pageSize, searchTerm),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
