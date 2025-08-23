import { z } from "zod";

export const orderEditSchema = z.object({
  status: z.enum([
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]),
});

export type OrderEditFormData = z.infer<typeof orderEditSchema>;
