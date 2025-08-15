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
    const response = await api.put(`/users/${userId}`, user);
    logger.log(response.data);
    return response.data;
};