"use client";
import ReportForm from "@/componrnts/reports/report-form";
import { addReport } from "@/data/fetchDummyReports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { parseReportFormData } from "@/utils/parseReportFormData";

const CreateReportPage = () => {
  const queryClient = useQueryClient();
  const navigate = useRouter();
  
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      navigate.push("/reports");
    },
    onError: (error) => {
      console.error("Error adding report:", error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsedData = parseReportFormData(formData);
    if (!parsedData) return;

    mutate(parsedData);
  };

  return (
    <>
      {isPending && <p>Creating report...</p>}
      {isError && <p>Error: {(error as Error).message}</p>}
      <ReportForm onSubmit={handleSubmit} />
    </>
  );
};

export default CreateReportPage;
