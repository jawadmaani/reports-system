"use client";
import { Report } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReportFormDialog from "@/components/main-header/report-dialog";
import { deleteReport, fetchReportById } from "@/api/reports-api";

interface ReportsDetailsPageProps {
  params: { reportSlug: string };
  onDeleteSuccess?: () => void;
  
}

const ReportsDetailsPage = ({
  params,
  onDeleteSuccess,
}: ReportsDetailsPageProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, isLoading, isError, error } = useQuery<Report>({
    queryKey: ["reports", params.reportSlug],
    queryFn: () =>fetchReportById(Number(params.reportSlug)),
  });

  const { mutate } = useMutation({
    mutationFn:(id:number)=> deleteReport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      setIsDeleting(false);
      router.push("/reports");
      if (onDeleteSuccess) onDeleteSuccess();
    },
    onError: (error: string) => {
    setIsDeleting(false);
    console.error("Delete failed:", error);
    alert("Failed to delete the report. Please try again.");
  },
  });

  const handleDelete = () => data && mutate(Number(params.reportSlug));

  if (isLoading)
    return <p className="text-gray-500 text-center py-10">Loading report...</p>;
  if (isError)
    return (
      <p className="text-red-600 text-center py-10">
        Error: {(error as Error).message}
      </p>
    );
  if (!data)
    return <p className="text-gray-500 text-center py-10">No data available</p>;


  return (
    <>
      {isDeleting && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
          <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl w-full max-w-sm shadow-lg space-y-4 text-center">
            <p className="text-gray-800 font-medium">
              Are you sure you want to delete this report?
            </p>
            <div className="flex justify-center gap-3 mt-3">
              <button
                className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-150"
                onClick={() => setIsDeleting(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-150"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute right-0 top-0 h-full w-[320px] bg-white/90 backdrop-blur-sm border-l border-gray-100 shadow-lg flex flex-col p-6 rounded-l-[2rem]">
        <div className="flex flex-col gap-3 flex-grow">
          <span
            className={`self-end px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm ${
              data.importance === "high"
                ? "bg-red-500"
                : data.importance === "medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {data.importance}
          </span>

          <h2 className="text-lg font-semibold text-gray-900 leading-snug">
            {data.title}
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed">
            {data.description}
          </p>

          <p className="text-[11px] text-gray-400 mt-1">
            {new Date(data.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <ReportFormDialog
              mode="edit"
              triggerLabel="Edit"
              initialData={data}
            />

            <button
              onClick={() => setIsDeleting(true)}
              className="w-full py-2.5 px-4 text-sm font-semibold rounded-full shadow-md 
             bg-red-600 hover:bg-red-700 text-white 
             transition-all duration-200 hover:scale-105 active:scale-95 
             focus:outline-none focus:ring-2 focus:ring-red-400/50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsDetailsPage;
