import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../productService";
import type { Product } from "../productTypes";
import type { AxiosError } from "axios";

export const useGetProductById = (productId: string) => {
  return useQuery<Product, AxiosError>({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });
};
