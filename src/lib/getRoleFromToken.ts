import type { JWTPayload } from "@/features/auth/authTypes.ts";
import { logger } from "./logger";
import { useAuthStore } from "@/features/auth/store";
import { jwtDecode } from "jwt-decode";

export const getRoleFromToken = (): string | null => {
  const { token } = useAuthStore.getState();
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode<JWTPayload>(token);
    return decodedToken.role;
  } catch (error) {
    logger.error("Error decoding token:", error);
    return null;
  }
};
