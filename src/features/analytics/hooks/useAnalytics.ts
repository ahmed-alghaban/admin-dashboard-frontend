import { useQuery } from "@tanstack/react-query";
import {
  getSalesSummary,
  getTopProducts,
  getUserGrowth,
  getOrderStatusSummary,
} from "../analyticsService.ts";

// Hook for sales summary data
export const useSalesSummary = (
  startDate?: string,
  endDate?: string,
  timeframe: string = "daily"
) => {
  return useQuery({
    queryKey: ["sales-summary", startDate, endDate, timeframe],
    queryFn: () => getSalesSummary(startDate, endDate, timeframe),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for top products data
export const useTopProducts = (
  limit: number = 5,
  sortBy: string = "quantity"
) => {
  return useQuery({
    queryKey: ["top-products", limit, sortBy],
    queryFn: () => getTopProducts(limit, sortBy),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for user growth data
export const useUserGrowth = (limit: number = 5, sortBy: string = "count") => {
  return useQuery({
    queryKey: ["user-growth", limit, sortBy],
    queryFn: () => getUserGrowth(limit, sortBy),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Hook for order status summary data
export const useOrderStatusSummary = () => {
  return useQuery({
    queryKey: ["order-status-summary"],
    queryFn: getOrderStatusSummary,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
