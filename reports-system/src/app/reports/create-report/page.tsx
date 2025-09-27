"use client";
import ReportForm from "@/components/reports/report-form";
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
      {isPending && (
        <p className="text-blue-600 text-center py-4">Creating report...</p>
      )}
      {isError && (
        <p className="text-red-600 text-center py-4">
          Error: {(error as Error).message}
        </p>
      )}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create New Report
        </h1>
        <ReportForm onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default CreateReportPage;
