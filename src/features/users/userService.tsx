import api from "@/lib/axios";
import type { UserCreateDto, UserUpdateDto } from "./userTypes";
import { logger } from "@/lib/logger";

export const getUsers = async () => {
  const response = await api.get("/users");
  logger.log(response.data);
  return response.data.result.items;
};

export const addUser = async (user: UserCreateDto) => {
  const response = await api.post("/users", user);
  logger.log(response.data);
  return response.data;
};

export const editUser = async (userId: string, user: UserUpdateDto) => {
  logger.log("editUser - userId:", userId);
  logger.log("editUser - user data being sent:", user);

  // The backend expects PUT /api/v1/users/{id} with UserUpdateDto in body
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
