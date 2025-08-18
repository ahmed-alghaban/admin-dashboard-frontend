import z from "zod";
import { validate as validateUUID } from "uuid";

export const userEditSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" }),
  phoneNumber: z.string().min(1, "Phone number is required"),
  roleId: z
    .string()
    .refine((val) => !val || validateUUID(val), {
      message: "Invalid UUID format for role ID",
    })
    .nullable()
    .optional(),
  profileImageUrl: z.string().optional(),
});
