import Link from "next/link";
import { Report } from "../../types/types";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";

type ReportItemProps = {
  report: Report;
};

const getImportanceColor = (importance: string) => {
  switch (importance) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ReportsItem = ({ report }: ReportItemProps) => {
  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardContent>
        <h2 className="text-lg font-bold mb-2">{report.title}</h2>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium">Importance:</span>
          <Badge className={getImportanceColor(report.importance)}>
            {report.importance}
          </Badge>
        </div>
        <p className="mb-2">
          <span className="font-medium">Type:</span> {report.type}
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/reports/${report.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ReportsItem;
