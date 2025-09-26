import { reportSchema } from "@/types/types";
import { Report } from "@/types/types";

export const parseReportFormData = (
  formData: FormData,
  existingReport?: Report
): Report | null => {
  const data = Object.fromEntries(formData);

  const reportData: Report = {
    id: existingReport ? existingReport.id : Date.now().toString(),
    createdAt: existingReport
      ? existingReport.createdAt
      : new Date().toISOString(),
    title: data.title as string,
    location: {
      lat: parseFloat(data.lat as string),
      lng: parseFloat(data.lng as string),
    },
    importance: data.importance as "low" | "medium" | "high",
    type: data.type as "traffic_light" | "roadwork" | "accident" | "other",
    description: data.description as string,
  };

  const parsed = reportSchema.safeParse(reportData);
  if (!parsed.success) return null;
  return parsed.data;
};
