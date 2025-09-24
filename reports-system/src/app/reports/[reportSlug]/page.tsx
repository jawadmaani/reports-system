"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchDummyReports } from "../../../data/fetchDummyReports";
import { reportSchema } from "@/types/types";

interface ReportsDetailsPageProps {
  params: { reportSlug: string };
}

const ReportsDetailsPage = ({ params }: ReportsDetailsPageProps) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["report", params.reportSlug],
    queryFn: () => fetchDummyReports(params.reportSlug),
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (!data) return <p>No data available</p>;

  const parsedData = reportSchema.parse(data);

  return (
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
        <strong>Location:</strong> {parsedData.location.lat},{" "}
        {parsedData.location.lng}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(parsedData.createdAt).toLocaleString()}
      </p>
    </article>
  );
};

export default ReportsDetailsPage;
