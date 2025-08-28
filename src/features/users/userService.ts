import api from "@/lib/axios";
import type { UserCreateDto, UserUpdateDto, User } from "./userTypes.ts";
import type { PaginationResult } from "@/lib/types";
import { logger } from "@/lib/logger";

export const getUsers = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  searchTerm?: string
): Promise<PaginationResult<User>> => {
  const queryParams = new URLSearchParams();
  queryParams.append("pageNumber", pageNumber.toString());
  queryParams.append("pageSize", pageSize.toString());

  if (searchTerm) {
    queryParams.append("searchTerm", searchTerm);
  }

  const response = await api.get(`/users?${queryParams.toString()}`);
  logger.log("getUsers response:", response.data);
  return response.data.result;
};

export const addUser = async (user: UserCreateDto) => {
  const response = await api.post("/users", user);
  logger.log(response.data);
  return response.data;
};

export const editUser = async (userId: string, user: UserUpdateDto) => {
  const response = await api.put(`/users/${userId}`, user);
  logger.log("editUser - response:", response.data);
  return response.data;
};

export const getUserById = async (userId: string) => {
  const response = await api.get(`/users/${userId}`);
  logger.log("getUserById response:", response.data);
  // Try different possible response structures
  return response.data.result || response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await api.delete(`/users/${userId}`);
  logger.log("deleteUser response:", response.data);
  return response.data;
};
