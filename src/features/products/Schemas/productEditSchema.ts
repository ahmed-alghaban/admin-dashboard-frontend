import z from "zod";
import { validate as validateUUID } from "uuid";

export const productEditSchema = z.object({
  productName: z
    .string()
    .min(1, "Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .optional(),
  sku: z
    .string()
    .min(1, "SKU is required")
    .min(3, "SKU must be at least 3 characters")
    .optional(),
  price: z
    .number()
    .min(0, "Price must be greater than or equal to 0")
    .optional(),
  quantityInStock: z
    .number()
    .min(0, "Quantity must be greater than or equal to 0")
    .optional(),
  categoryId: z
    .string()
    .refine((val) => !val || validateUUID(val), {
      message: "Invalid UUID format for category ID",
    })
    .nullable()
    .optional(),
  imageUrl: z.string().optional(),
});

export type ProductEditFormData = z.infer<typeof productEditSchema>;
