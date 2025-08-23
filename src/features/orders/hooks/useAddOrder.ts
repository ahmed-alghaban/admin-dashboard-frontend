import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../orderService";
import type { OrderCreateDto } from "../orderTypes";
import { toast } from "sonner";
import { logger } from "@/lib/logger";

export const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: OrderCreateDto) => createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order created successfully");
    },
    onError: (error) => {
      logger.error("Error creating order:", error);
      toast.error("Failed to create order");
    },
  });
};
