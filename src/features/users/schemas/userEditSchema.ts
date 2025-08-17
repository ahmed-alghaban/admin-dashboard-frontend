import z from "zod";

export const userEditSchema = z.object({
    firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" }),
    phoneNumber: z.string().min(1, "Phone number is required"),

    profileImageUrl: z.string().optional(),
});
