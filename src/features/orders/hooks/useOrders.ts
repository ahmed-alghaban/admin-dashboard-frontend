import { useQuery } from "@tanstack/react-query";
import { getOrders, getOrderById } from "../orderService";
import type { PaginatedOrdersResponse } from "../orderTypes";

export const useOrders = (
  pageNumber: number = 1,
  pageSize: number = 10,
  searchTerm?: string,
  statusFilter?: string,
  startDate?: string,
  endDate?: string
) => {
  return useQuery<PaginatedOrdersResponse>({
    queryKey: [
      "orders",
      pageNumber,
      pageSize,
      searchTerm,
      statusFilter,
      startDate,
      endDate,
    ],
    queryFn: () =>
      getOrders(
        pageNumber,
        pageSize,
        searchTerm,
        statusFilter,
        startDate,
        endDate
      ),
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
