import { z } from "zod";

export const reportSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title cannot be empty").max(100, "Title too long"),
  location: z.object({
    lat: z.number().min(-90, "Latitude must be >= -90").max(90, "Latitude must be <= 90"),
    lng: z.number().min(-180, "Longitude must be >= -180").max(180, "Longitude must be <= 180"),
  }),
  importance: z.enum(["low", "medium", "high"]),
  type: z.enum(["trafficLight", "roadwork", "accident", "other"]),

  description: z.string().min(1, "Description cannot be empty").max(1000, "Description too long").optional(),
  createdAt: z.string().datetime(),
});

export const reportsSchema = z.array(reportSchema);

export type Report = z.infer<typeof reportSchema>;
