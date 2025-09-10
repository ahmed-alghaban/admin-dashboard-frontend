import { z } from "zod";

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
    .refine(
      (val) => {
        // Allow empty string for optional categories
        if (val === "") return true;
        // Allow any string that looks like a UUID (basic format check)
        const uuidRegex =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(val);
      },
      {
        message: "Invalid UUID format for category ID",
      }
    )
    .optional(),
  imageUrl: z.string().optional(),
});

export type ProductEditFormData = z.infer<typeof productEditSchema>;
