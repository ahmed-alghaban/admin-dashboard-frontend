import api from "@/lib/axios";
import { logger } from "@/lib/logger";

export const getRoles = async () => {
  const response = await api.get("/roles");
  logger.log(response.data);
  return response.data.result || response.data;
};
