"use client";

import { useState } from "react";
import { updateReport } from "@/data/fetchDummyReports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Report } from "@/types/types";
import ReportForm from "./report-form";
import { parseReportFormData } from "@/utils/parseReportFormData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface ReportEditPageProps {
  data: Report;
  onUpdate?: (updatedReport: Report) => void;
}

const ReportEditPage = ({ data, onUpdate }: ReportEditPageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      setIsOpen(false);
      if (onUpdate) onUpdate(data as Report);
    },
    onError: (error) => {
      console.error("Error updating report:", error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsedData = parseReportFormData(formData);
    if (!parsedData) return;
    mutate({ id: data.id, updated: parsedData });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors">
          Edit Report
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full bg-white rounded-2xl border border-gray-200 shadow-xl p-6 z-50">
        <DialogHeader className="pb-2 border-b border-gray-200">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Edit Report
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-1 text-sm">
            Update the details of your report below.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <ReportForm onSubmit={handleSubmit} initialData={data} />
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <DialogClose asChild>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
              Close
            </button>
          </DialogClose>

          {isPending && (
            <span className="px-4 py-2 text-blue-600 font-medium">
              Updating...
            </span>
          )}

          {isError && (
            <span className="px-4 py-2 text-red-600 font-medium">
              Error: {(error as Error).message}
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportEditPage;
