import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInventoryQuantity } from "../inventoryService";
import { toast } from "sonner";

export const useUpdateInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      updateInventoryQuantity(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      toast.success("Inventory quantity updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update inventory quantity");
    },
  });
};
