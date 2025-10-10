"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDummyReports } from "../../data/fetchDummyReports";
import { reportsSchema, Report } from "@/types/types";
import ReportsGrid from "@/components/reports/reports-grid";
import ReportFormDialog from "@/components/main-header/report-dialog";
import ReportCard from "@/components/reports/report-card";
import ReportMap from "@/components/reports/report-map";
import ReportsDetailsPage from "@/app/reports/[reportSlug]/page";
import { useState, useMemo } from "react";
import { X } from "lucide-react";

export default function ReportsPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["reports"],
    queryFn: () => fetchDummyReports(),
  });

    const parseData = reportsSchema.parse(data);

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = useMemo(() => {
    if (!searchTerm) return parseData;
    return parseData.filter((report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, parseData]);
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


  return (
    <div className="flex min-h-screen bg-gray-50 flex-col">
      <header className="bg-white border-b border-gray-200 shadow-sm z-20 relative">
        <div className="px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <ReportCard data={parseData} />
          <ReportFormDialog mode="create" triggerLabel="Create Report" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className="sticky top-0 h-[calc(100vh-64px)] w-80 border-r border-gray-200 bg-white shadow-sm flex flex-col flex-shrink-0 z-20">
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reports..."
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm transition-all"
            />
          </div>

          <div className="flex-1 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
            <ReportsGrid
              reports={filteredReports}
              onSelect={(report) => setSelectedReport(report)}
            />
          </div>
        </aside>

        <main className="flex-1 relative overflow-hidden">
          {selectedReport ? (
            <ReportMap
              key={selectedReport.id}
              latitude={selectedReport.location.lat}
              longitude={selectedReport.location.lng}
              interactive={false}
              height="100%"
              zoom={14}
              markerColor={
                selectedReport.importance === "high"
                  ? "#ef4444"
                  : selectedReport.importance === "medium"
                  ? "#eab308"
                  : "#22c55e"
              }
            />
          ) : (
            <ReportMap
              key="default-map"
              latitude={31.9454}
              longitude={35.9284}
              interactive={false}
              height="100%"
              zoom={12}
              markerColor="#3b82f6"
            />
          )}
        </main>

        {selectedReport && (
          <div className="absolute right-0 top-0 h-full w-[380px] z-30 flex flex-col items-end p-4 animate-in slide-in-from-right duration-300">
            <button
              onClick={() => setSelectedReport(null)}
              className="mb-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all hover:rotate-90 duration-300"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full">
              <ReportsDetailsPage
                params={{ reportSlug: selectedReport.id }}
                onDeleteSuccess={() => setSelectedReport(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
