import { z } from "zod";

export const categoryEditSchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .min(2, "Category name must be at least 2 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
});

export type CategoryEditFormData = z.infer<typeof categoryEditSchema>;
