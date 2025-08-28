import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "../productService.ts";
import type { ProductUpdateDto } from "../productTypes.ts";
import { queryClient } from "@/lib/queryClient";
import { logger } from "@/lib/logger";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export const useEditProduct = () => {
  return useMutation({
    mutationFn: ({
      productId,
      product,
    }: {
      productId: string;
      product: ProductUpdateDto;
    }) => updateProduct(productId, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
    },
    onError: (error: AxiosError) => {
      logger.error(error);
      const errorData = error.response?.data as
        | {
            errors?: Record<string, string[]>;
            title?: string;
            message?: string;
          }
        | undefined;

      // Handle validation errors from the API
      if (errorData?.errors) {
        const errorMessages = Object.values(errorData.errors)
          .flat()
          .filter((msg: string) => typeof msg === "string")
          .join(", ");
        toast.error(errorMessages || "Validation failed");
      } else {
        // Fallback to other error formats
        const message: string =
          errorData?.title ||
          errorData?.message ||
          error.message ||
          "Failed to update product";
        toast.error(message);
      }
    },
  });
};
