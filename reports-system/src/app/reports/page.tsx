"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDummyReports } from "../../data/fetchDummyReports";
import ReportsGrid from "@/components/reports/reports-grid";
import { reportsSchema } from "@/types/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReportFilteredPage from "@/components/reports/report-filter";

export default function ReportsPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["reports"],
    queryFn: () => fetchDummyReports(),
  });

  if (isPending)
    return (
      <p className="text-gray-500 text-center py-10">Loading reports...</p>
    );
  if (isError)
    return (
      <p className="text-red-600 text-center py-10">
        Error: {(error as Error).message}
      </p>
    );
  if (!data)
    return (
      <p className="text-gray-500 text-center py-10">No reports available.</p>
    );

  const parseData = reportsSchema.parse(data);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <ReportsGrid reports={parseData} />
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/reports/create-report">Create New Report</Link>
        </Button>
      </div>
      <ReportFilteredPage data={parseData} />
    </div>
  );
}
