"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteReport,
  fetchDummyReports,
} from "../../../data/fetchDummyReports";
import { reportSchema } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReportEditPage from "@/componrnts/reports/report-edit";
import ReportMap from "@/componrnts/reports/report-map";

interface ReportsDetailsPageProps {
  params: { reportSlug: string };
}

const ReportsDetailsPage = ({ params }: ReportsDetailsPageProps) => {
  const navigate = useRouter();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["report", params.reportSlug],
    queryFn: () => fetchDummyReports(params.reportSlug),
  });

  const { mutate } = useMutation({
    mutationFn: deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      navigate.push("/reports");
    },
  });

  const handleDelete = () => {
    if (data) {
      mutate(params.reportSlug);
    }
  };

  const handleStartDelete = () => {
    setIsDeleting(true);
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (!data) return <p>No data available</p>;

  const parsedData = reportSchema.parse(data);

  return (
    <>
      {isDeleting && (
        <div>
          <p>Are you sure you want to delete this report?</p>
          <button onClick={handleCancelDelete}>Cancel</button>
          <button onClick={handleDelete}>Confirm Delete</button>
        </div>
      )}
      <article>
        <h1>{parsedData.title}</h1>
        <p>
          <strong>Description:</strong> {parsedData.description}
        </p>
        <p>
          <strong>Importance:</strong> {parsedData.importance}
        </p>
        <p>
          <strong>Type:</strong> {parsedData.type}
        </p>

        <p>
          <div>
            <strong>Location:</strong>{" "}
            <button onClick={() => setShowMap((prev) => !prev)}>
              {showMap ? "Hide Map" : "Show Map"}
            </button>
            {showMap && (
              <ReportMap
                latitude={parsedData.location.lat}
                longitude={parsedData.location.lng}
                height="400px"
              />
            )}
          </div>
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(parsedData.createdAt).toLocaleString()}
        </p>
        <ReportEditPage data={parsedData} />
        <button onClick={handleStartDelete}>Delete Report</button>
      </article>
    </>
  );
};
export default ReportsDetailsPage;
