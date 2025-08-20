import api from "@/lib/axios";
import type {
  ProductCreateDto,
  ProductUpdateDto,
  Product,
} from "./productTypes";
import type { PaginationResult } from "@/lib/types";
import { logger } from "@/lib/logger";

export const getProducts = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  searchTerm?: string
): Promise<PaginationResult<Product>> => {
  const queryParams = new URLSearchParams();
  queryParams.append("pageNumber", pageNumber.toString());
  queryParams.append("pageSize", pageSize.toString());

  if (searchTerm) {
    queryParams.append("searchTerm", searchTerm);
  }

  const response = await api.get(`/products?${queryParams.toString()}`);
  logger.log("getProducts response:", response.data);
  return response.data.result;
};

export const getProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data.result || response.data;
};

export const createProduct = async (product: ProductCreateDto) => {
  const response = await api.post("/products", product);
  return response.data;
};

export const updateProduct = async (id: string, product: ProductUpdateDto) => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};
