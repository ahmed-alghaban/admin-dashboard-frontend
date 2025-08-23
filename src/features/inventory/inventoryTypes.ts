// Inventory DTO (response from API)
export interface Inventory {
  inventoryId: string; // Guid maps to string
  productId: string; // Guid maps to string
  quantityAvailable: number;
  reorderLevel: number;
  lastRestockedAt?: string; // DateTime? maps to optional string
}

// Inventory Update DTO
export interface InventoryUpdateDto {
  quantity: number;
}

// Inventory Filters
export interface InventoryFilters {
  searchTerm: string;
  productFilter: string;
  stockLevelFilter: string;
  pageNumber: number;
  pageSize: number;
}

// Paginated Inventory Response
export interface PaginatedInventoryResponse {
  items: Inventory[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
