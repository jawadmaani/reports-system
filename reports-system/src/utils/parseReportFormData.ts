import { reportSchema } from "@/types/types";
import { Report } from "@/types/types";

export const parseReportFormData = (
  formData: FormData,
  existingReport?: Report
): Report | null => {
  const data = Object.fromEntries(formData);

  const reportData: Report = {
    id: existingReport ? existingReport.id : undefined,
    createdAt: existingReport
      ? existingReport.createdAt
      : new Date().toISOString(),
    title: data.title as string,
    location: {
      lat: parseFloat(data.lat as string),
      lng: parseFloat(data.lng as string),
    },
    importance: data.importance as "low" | "medium" | "high",
    type: data.type as "trafficLight" | "roadwork" | "accident" | "other",
    description: data.description ? (data.description as string) : undefined,
  };

  const parsed = reportSchema.safeParse(reportData);
  if (!parsed.success) return null;
  return parsed.data;
};
