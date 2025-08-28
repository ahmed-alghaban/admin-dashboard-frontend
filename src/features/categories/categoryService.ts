import api from "@/lib/axios";
import { logger } from "@/lib/logger";
import type { CategoryCreateDto, CategoryUpdateDto } from "./categoryTypes.ts";

export const getCategories = async () => {
  const response = await api.get("/categories");
  logger.log(response.data);
  return response.data.result;
};

export const getCategory = async (categoryId: string) => {
  const response = await api.get(`/categories/${categoryId}`);
  logger.log(response.data);
  return response.data.result;
};

export const addCategory = async (category: CategoryCreateDto) => {
  const response = await api.post("/categories", category);
  logger.log(response.data);
  return response.data.result;
};

export const updateCategory = async (
  categoryId: string,
  category: CategoryUpdateDto
) => {
  const response = await api.put(`/categories/${categoryId}`, category);
  logger.log(response.data);
  return response.data.result;
};

export const deleteCategory = async (categoryId: string) => {
  const response = await api.delete(`/categories/${categoryId}`);
  logger.log(response.data);
  return response.data.result;
};
