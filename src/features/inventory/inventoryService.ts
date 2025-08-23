import api from "@/lib/axios";
import type { Inventory } from "./inventoryTypes";
import type { PaginationResult } from "@/lib/types";
import { logger } from "@/lib/logger";

export const getInventories = async (
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<PaginationResult<Inventory>> => {
  const queryParams = new URLSearchParams();
  queryParams.append("pageNumber", pageNumber.toString());
  queryParams.append("pageSize", pageSize.toString());

  const response = await api.get(`/inventory?${queryParams.toString()}`);
  logger.log("getInventories response:", response.data);
  return response.data.result;
};

export const updateInventoryQuantity = async (
  id: string,
  quantity: number
): Promise<Inventory> => {
  // Send quantity as query parameter to match C# controller signature
  const response = await api.put(`/inventory/${id}?quantity=${quantity}`);
  logger.log("updateInventoryQuantity response:", response.data);
  return response.data.result;
};
