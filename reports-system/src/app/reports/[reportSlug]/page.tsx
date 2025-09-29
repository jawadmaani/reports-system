"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteReport,
  fetchDummyReports,
} from "../../../data/fetchDummyReports";
import { reportSchema, Report } from "@/types/types";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import ReportMap from "@/components/reports/report-map";
import ReportEditPage from "@/components/reports/report-edit";

interface ReportsDetailsPageProps {
  params: { reportSlug: string };
}

const ReportsDetailsPage = ({ params }: ReportsDetailsPageProps) => {
  const navigate = useRouter();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["report", params.reportSlug],
    queryFn: () => fetchDummyReports( params.reportSlug),
  });

  const { mutate } = useMutation({
    mutationFn: deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      navigate.push("/reports");
    },
  });

  const handleDelete = () => {
    if (data) mutate( params.reportSlug);
  };
  const handleStartDelete = () => setIsDeleting(true);
  const handleCancelDelete = () => setIsDeleting(false);

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

  const parsedData = reportSchema.parse(data);

  const handleUpdate = (updatedReport: Report) => {
    queryClient.setQueryData(["report",  params.reportSlug], updatedReport);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {isDeleting && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4">
            <p className="text-gray-800 font-semibold text-center">
              Are you sure you want to delete this report?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                onClick={handleDelete}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <article className="bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-100">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-900">
            {parsedData.title}
          </h1>
          <span
            className={`px-3 py-1 rounded-full font-medium text-sm ${
              parsedData.importance === "high"
                ? "bg-red-100 text-red-800"
                : parsedData.importance === "medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {parsedData.importance}
          </span>
        </header>

        <p className="text-gray-700 text-lg">{parsedData.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-gray-600 font-medium">
          <span>Type:</span>
          <span className="px-2 py-1 bg-gray-100 rounded-lg">
            {parsedData.type}
          </span>
        </div>

        <div className="mt-4">
          <strong className="text-gray-800">Location:</strong>
          <button
            className="ml-3 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setShowMap((prev) => !prev)}
          >
            {showMap ? "Hide Map" : "Show Map"}
          </button>
          {showMap && (
            <div className="mt-4 rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <ReportMap
                latitude={parsedData.location.lat}
                longitude={parsedData.location.lng}
                height="400px"
                interactive={false}
              />
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500">
          Created At: {new Date(parsedData.createdAt).toLocaleString()}
        </p>

        <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-inner border border-gray-100">
          <ReportEditPage data={parsedData} onUpdate={handleUpdate} />
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow"
            onClick={handleStartDelete}
          >
            Delete Report
          </button>
        </div>
      </article>
    </div>
  );
};

export default ReportsDetailsPage;
