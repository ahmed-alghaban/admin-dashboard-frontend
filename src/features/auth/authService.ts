import api from "@/lib/axios";
import { type LoginInput, type LoginResponse } from "./authTypes";

export const login = async (input: LoginInput): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", input)
    return response.data;
};