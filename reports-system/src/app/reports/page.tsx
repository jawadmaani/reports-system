"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDummyReports } from "../../data/fetchDummyReports";
import ReportsGrid from "@/componrnts/reports/reports-grid";
import { reportsSchema } from "@/types/types";
import Link from "next/link";

export default function ReportsPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reports"],
    queryFn: () => fetchDummyReports(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (!data) return <p>No data available</p>;

  const parseData = reportsSchema.parse(data);
  return (
    <>
      <h1>Reports Page</h1>
      <ReportsGrid reports={parseData} />
      <Link href="/reports/create-report">Create New Report</Link>
    </>
  );
}
