import api from "@/lib/axios";
import type {
  Order,
  OrderCreateDto,
  PaginatedOrdersResponse,
} from "./orderTypes";

const ORDERS_BASE_URL = "/orders";

// Get all orders with pagination and filters
export const getOrders = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  searchTerm?: string,
  statusFilter?: string,
  startDate?: string,
  endDate?: string
): Promise<PaginatedOrdersResponse> => {
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  });

  if (searchTerm) params.append("searchTerm", searchTerm);
  if (statusFilter && statusFilter !== "all")
    params.append("status", statusFilter);
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  const response = await api.get(`${ORDERS_BASE_URL}?${params}`);
  return response.data.result;
};

// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await api.get(`${ORDERS_BASE_URL}/${orderId}`);
  return response.data.result;
};

// Create new order
export const createOrder = async (
  orderData: OrderCreateDto
): Promise<Order> => {
  const response = await api.post(ORDERS_BASE_URL, orderData);
  return response.data.result;
};

export const updateOrderStatus = async (
  orderId: string,
  status: string
): Promise<Order> => {
  const response = await api.put(`${ORDERS_BASE_URL}/${orderId}/status`, {
    status,
  });
  return response.data.result;
};
