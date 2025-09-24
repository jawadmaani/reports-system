import Link from "next/link";
import { Report } from "../../types/types";

type ReportItemProps = {
  report: Report;
};

const ReportsItem = ({ report }: ReportItemProps) => {
  return (
    <>
      <h2>{report.title}</h2>
      <p>Importance: {report.importance}</p>
      <p>Type: {report.type}</p>
      <Link href={`/reports/${report.id}`}>View Details</Link>
    </>
  );
};

export default ReportsItem;
