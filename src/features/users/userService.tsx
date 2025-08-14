import api from "@/lib/axios";
import type { UserCreateDto } from "./userTypes";
import { logger } from "@/lib/logger";

export const getUsers = async () => {
    const response = await api.get("/users");
    logger.log(response.data);
    return response.data;
};

export const addUser = async (user: UserCreateDto) => {
    const response = await api.post("/users", user);
    logger.log(response.data);
    return response.data;
};