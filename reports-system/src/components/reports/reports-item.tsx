import { Report } from "../../types/types";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { FileText } from "lucide-react";

type ReportItemProps = {
  report: Report;
  onSelect?: (report: Report) => void; 
};

const getImportanceColor = (importance: string) => {
  switch (importance) {
    case "high":
      return "bg-red-50 text-red-600 border border-red-100";
    case "medium":
      return "bg-amber-50 text-amber-600 border border-amber-100";
    case "low":
      return "bg-emerald-50 text-emerald-600 border border-emerald-100";
    default:
      return "bg-gray-50 text-gray-600 border border-gray-100";
  }
};

const ReportsItem = ({ report, onSelect }: ReportItemProps) => {
  return (
    <Card
      onClick={() => onSelect?.(report)} 
      className="group border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md hover:bg-gray-50/30 transition-all duration-200 cursor-pointer bg-white"
    >
      <CardContent className="p-3.5">
        <div className="flex items-center justify-between gap-3.5">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate mb-0.5 group-hover:text-gray-950 transition-colors duration-200">
                {report.title}
              </h3>
              <p className="text-xs text-gray-500 capitalize truncate">
                {report.type}
              </p>
            </div>
          </div>

          <Badge
            className={`text-xs font-medium px-2.5 py-1 rounded-md capitalize shadow-sm ${getImportanceColor(
              report.importance
            )}`}
          >
            {report.importance}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsItem;
