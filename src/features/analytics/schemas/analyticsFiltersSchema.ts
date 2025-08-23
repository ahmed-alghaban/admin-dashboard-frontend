import { z } from "zod";

export const analyticsFiltersSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  timeframe: z.enum(["daily", "weekly", "monthly"]).default("daily"),
  limit: z.number().min(1).max(100).optional().default(5),
  sortBy: z.string().optional(),
});

export type AnalyticsFiltersSchema = z.infer<typeof analyticsFiltersSchema>;
