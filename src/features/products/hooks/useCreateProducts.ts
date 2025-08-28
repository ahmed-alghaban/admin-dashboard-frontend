import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../productService.ts";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { logger } from "@/lib/logger";
import type { AxiosError } from "axios";

interface ValidationErrorResponse {
  type: string;
  title: string;
  status: number;
  errors: Record<string, string[]>;
  traceId: string;
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
    },
    onError: (error: AxiosError<ValidationErrorResponse>) => {
      logger.error("Failed to create product:", error);

      const errorData = error.response?.data;

      if (errorData?.errors) {
        // Extract all validation error messages
        const errorMessages = Object.values(errorData.errors)
          .flat()
          .filter(Boolean);

        if (errorMessages.length > 0) {
          // Display the first error message, or show multiple if there are many
          if (errorMessages.length === 1) {
            toast.error(errorMessages[0]);
          } else {
            toast.error(
              `Validation errors: ${errorMessages.slice(0, 3).join(", ")}${errorMessages.length > 3 ? "..." : ""}`
            );
          }
        } else {
          toast.error(errorData.title || "Failed to create product");
        }
      } else {
        toast.error(errorData?.title || "Failed to create product");
      }
    },
  });
};
