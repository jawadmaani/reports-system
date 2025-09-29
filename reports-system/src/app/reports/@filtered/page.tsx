"use client";
import ReportsGrid from "@/components/reports/reports-grid";
import { fetchDummyReports } from "@/data/fetchDummyReports";
import { reportsSchema, Report } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ReportFilteredPage = () => {
  const [selectedImportance, setSelectedImportance] = useState<
    "high" | "medium" | "low"
  >("high");
  const { data, isLoading, error } = useQuery({
    queryKey: ["reports"],
    queryFn: () => fetchDummyReports(),
  });
  if (isLoading) return <p>Loading reports...</p>;
  if (error) return <p>Error loading reports: {(error as Error).message}</p>;
  if (data) {
    const parsedData = reportsSchema.parse(data);
    const filteredReportsHigh = parsedData.filter(
      (report: Report) => report.importance === "high"
    );
    const filteredReportsMedium = parsedData.filter(
      (report: Report) => report.importance === "medium"
    );
    const filteredReportsLow = parsedData.filter(
      (report: Report) => report.importance === "low"
    );
    const filteredReports =
      selectedImportance === "high"
        ? filteredReportsHigh
        : selectedImportance === "medium"
        ? filteredReportsMedium
        : filteredReportsLow;

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Filtered Reports (by importance)
        </h1>
        <div className="flex gap-6 mb-6">
          {["high", "medium", "low"].map((level) => (
            <label key={level} className="flex items-center gap-2">
              <input
                type="radio"
                name="importance"
                value={level}
                checked={selectedImportance === level}
                onChange={() =>
                  setSelectedImportance(level as "high" | "medium" | "low")
                }
                className="accent-blue-600"
              />
              <span className="capitalize">{level}</span>
            </label>
          ))}
        </div>
        <ReportsGrid reports={filteredReports} />
      </div>
    );
  }
  return <p>No reports available.</p>;
};

export default ReportFilteredPage;
