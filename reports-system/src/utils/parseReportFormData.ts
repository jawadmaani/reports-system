import { reportSchema } from "@/types/types";
import { Report } from "@/types/types";

export const parseReportFormData = (formData: FormData): Report | null => {
  const data = Object.fromEntries(formData);

  const reportData = {
    id: Date.now().toString(),
    title: data.title,
    location: {
      lat: parseFloat(data.lat as string),
      lng: parseFloat(data.lng as string),
    },
    importance: data.importance,
    type: data.type,
    description: data.description,
    createdAt: new Date().toISOString(),
  };

  const parsed = reportSchema.safeParse(reportData);
  if (!parsed.success) {
    return null;
  }
  return parsed.data;
};
