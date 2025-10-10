"use client";
import { useState } from "react";
import { addReport, updateReport } from "@/data/fetchDummyReports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Report } from "@/types/types";
import ReportForm from "../reports/report-form";
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
import { Button } from "../ui/button";

interface ReportFormDialogProps {
  mode: "create" | "edit";
  initialData?: Report;
  triggerLabel?: React.ReactNode;
}
const ReportFormDialog = ({
  mode,
  initialData,
  triggerLabel,
}: ReportFormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutationFn = (data: Report | { id: string; updated: Report }) => {
    if (mode === "edit" && "id" in data)
      return updateReport(data as { id: string; updated: Report });
    return addReport(data as Report);
  };
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      setIsOpen(false);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsedData = parseReportFormData(formData);
    if (!parsedData) return;

    if (mode === "edit" && initialData) {
      mutate({ id: initialData.id, updated: parsedData });
    } else {
      mutate(parsedData);
    }
  };

  const title = mode === "create" ? "Create Report" : "Edit Report";
  const description =
    mode === "create"
      ? "Fill out the details below to create a new report."
      : "Update the details of your report below.";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {triggerLabel && (
        <DialogTrigger asChild>
          <Button
            className={`px-4 py-2 text-sm hover:scale-105  font-semibold rounded-full shadow-md transition-transform ${
              mode === "create"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {triggerLabel}
          </Button>
        </DialogTrigger>
      )}

      <DialogContent
        className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-6"
        style={{
          width: "clamp(320px, 60vw, 750px)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <DialogHeader className="pb-3 border-b border-gray-200">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm mt-1">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <ReportForm onSubmit={handleSubmit} initialData={initialData} />
        </div>

        <div className="flex justify-end mt-5 gap-3">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
            >
              Close
            </Button>
          </DialogClose>

          {isPending && (
            <span className="px-4 py-2 text-sm text-blue-600 font-medium">
              {mode === "create" ? "Creating..." : "Updating..."}
            </span>
          )}

          {isError && (
            <span className="px-4 py-2 text-sm text-red-600 font-medium">
              Error: {(error as Error).message}
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportFormDialog;
