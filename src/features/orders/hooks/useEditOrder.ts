import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../orderService.ts";
import { toast } from "sonner";
import { logger } from "@/lib/logger";

export const useEditOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      updateOrderStatus(orderId, status),
    onSuccess: () => {
      // Invalidate all orders queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
      toast.success("Order status updated successfully");
    },
    onError: (error) => {
      logger.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    },
  });
};
