import { updateReport } from "@/data/fetchDummyReports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Report } from "@/types/types";
import ReportForm from "./report-form";
import { parseReportFormData } from "@/utils/parseReportFormData";

interface ReportEditPageProps {
  data: Report;
}

const ReportEditPage = ({ data }: ReportEditPageProps) => {
  const queryClient = useQueryClient();
  const navigate = useRouter();
  
  const { mutate } = useMutation({
    mutationFn: updateReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      navigate.push("/reports");
    },
    onError: (error) => {
      console.error("Error updating report:", error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsedData = parseReportFormData(formData);
    if (!parsedData) return;
    mutate({ id: data.id, updated: parsedData });
  };

  return <ReportForm onSubmit={handleSubmit} initialData={data} />;
};

export default ReportEditPage;
