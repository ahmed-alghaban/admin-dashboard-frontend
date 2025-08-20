import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../productService";

export const useProducts = (pageNumber: number = 1, pageSize: number = 10, searchTerm?: string) => {
  return useQuery({
    queryKey: ["products", pageNumber, pageSize, searchTerm],
    queryFn: () => getProducts(pageNumber, pageSize, searchTerm),
  });
};
