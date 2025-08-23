export interface SalesSummaryDto {
  date: string;
  totalAmount: number;
  orderCount: number;
}

export interface TopProductDto {
  productId: string;
  productName: string;
  quantitySold: number;
  totalRevenue: number;
}

export interface UserGrowthDto {
  date: string;
  count: number;
}

export interface OrderStatusSummaryDto {
  status: string;
  count: number;
}

export interface AnalyticsResponse<T> {
  data: T;
  message: string;
}

export interface AnalyticsFilters {
  startDate?: string;
  endDate?: string;
  timeframe?: 'daily' | 'weekly' | 'monthly';
  limit?: number;
  sortBy?: string;
}
