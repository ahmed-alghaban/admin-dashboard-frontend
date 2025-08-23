import { z } from "zod";

export const orderCreateSchema = z.object({
  paymentMethod: z.string().min(1, "Payment method is required"),
  shippingAddress: z.string().min(1, "Shipping address is required"),
  orderItems: z
    .array(
      z.object({
        productId: z.string().min(1, "Product ID is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
      })
    )
    .optional()
    .default([]),
});

export type OrderCreateFormData = z.infer<typeof orderCreateSchema>;
