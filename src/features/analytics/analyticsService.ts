import api from "@/lib/axios";
import type {
  SalesSummaryDto,
  TopProductDto,
  UserGrowthDto,
  OrderStatusSummaryDto,
  AnalyticsResponse,
} from "./analyticsTypes";

const ANALYTICS_BASE_URL = "/analytics";

// Get sales summary with date range and timeframe
export const getSalesSummary = async (
  startDate?: string,
  endDate?: string,
  timeframe: string = "daily"
): Promise<SalesSummaryDto[]> => {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  if (timeframe) params.append("timeframe", timeframe);

  const response = await api.get<AnalyticsResponse<SalesSummaryDto[]>>(
    `${ANALYTICS_BASE_URL}/sales-summary?${params}`
  );
  return response.data.data;
};

// Get top products
export const getTopProducts = async (
  limit: number = 5,
  sortBy: string = "quantity"
): Promise<TopProductDto[]> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    sortBy,
  });

  const response = await api.get<AnalyticsResponse<TopProductDto[]>>(
    `${ANALYTICS_BASE_URL}/top-products?${params}`
  );
  return response.data.data;
};

// Get user growth
export const getUserGrowth = async (
  limit: number = 5,
  sortBy: string = "count"
): Promise<UserGrowthDto[]> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    sortBy,
  });

  const response = await api.get<AnalyticsResponse<UserGrowthDto[]>>(
    `${ANALYTICS_BASE_URL}/users-growth?${params}`
  );
  return response.data.data;
};

// Get order status summary
export const getOrderStatusSummary = async (): Promise<
  OrderStatusSummaryDto[]
> => {
  const response = await api.get<AnalyticsResponse<OrderStatusSummaryDto[]>>(
    `${ANALYTICS_BASE_URL}/order-status-summary`
  );
  return response.data.data;
};
