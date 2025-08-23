// Order Item DTO
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Order DTO (response from API)
export interface Order {
  orderId: string;
  userId: string;
  userFullName: string;
  orderDate: string;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  shippingAddress: string;
  orderItems: OrderItem[];
}

// Order Status enum
export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

// Order Create DTO (for creating new orders)
export interface OrderCreateDto {
  paymentMethod: string;
  shippingAddress: string;
  orderItems: {
    productId: string;
    quantity: number;
  }[];
}

// Order Status Update DTO (only status can be updated)
export interface OrderStatusUpdateDto {
  status: OrderStatus;
}

// Paginated Orders Response
export interface PaginatedOrdersResponse {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items: Order[];
}

// Order Filters
export interface OrderFilters {
  searchTerm: string;
  statusFilter: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  pageNumber: number;
  pageSize: number;
}
