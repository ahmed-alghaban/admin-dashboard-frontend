import { z } from "zod";

export const inventoryEditSchema = z.object({
  quantity: z
    .number()
    .min(0, "Quantity must be 0 or greater")
    .int("Quantity must be a whole number"),
});

export type InventoryEditSchema = z.infer<typeof inventoryEditSchema>;
