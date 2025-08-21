import api from "@/lib/axios";
import { logger } from "@/lib/logger";

export const getCategories = async () => {
  const response = await api.get("/categories");
  logger.log(response.data);
  return response.data.result;
};
