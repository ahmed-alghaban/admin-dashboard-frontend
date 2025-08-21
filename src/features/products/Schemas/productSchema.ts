import { z } from "zod";

export const productCreateSchema = z.object({
  productName: z
    .string()
    .min(1, "Product name is required")
    .min(2, "Product name must be at least 2 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
  sku: z
    .string()
    .min(1, "SKU is required")
    .min(3, "SKU must be at least 3 characters"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  quantityInStock: z
    .number()
    .min(0, "Quantity must be greater than or equal to 0"),
  categoryId: z.string().min(1, "Category is required"),
  imageUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
});

export type ProductCreateFormData = z.infer<typeof productCreateSchema>;
