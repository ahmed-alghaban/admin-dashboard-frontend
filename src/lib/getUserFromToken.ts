import type { JWTPayload } from "@/features/auth/authTypes";
import { logger } from "./logger";
import { useAuthStore } from "@/features/auth/store";
import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
    const { token } = useAuthStore.getState();
    if (!token) {
        return null;
    }

    try {
        const decodedToken = jwtDecode<JWTPayload>(token);
        return {
            id: decodedToken.nameid,
            name: decodedToken.name,
            email: decodedToken.email,
            role: decodedToken.role,
        };
    } catch (error) {
        logger.error("Error decoding token:", error);
        return null;
    }
}; 