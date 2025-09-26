import { z } from "zod";

export const reportSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title cannot be empty"),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  importance: z.enum(["low", "medium", "high"]),
  type: z.enum(["signal", "roadwork", "accident", "other"]),
  description: z.string().min(1, "Description cannot be empty"),
  createdAt: z.string().datetime(),
});

export const reportsSchema = z.array(reportSchema);

export type Report = z.infer<typeof reportSchema>;
