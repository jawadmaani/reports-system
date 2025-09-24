import { Report } from "../../types/types";

type ReportItemProps = {
  report: Report;
};

const ReportsItem = ({ report }: ReportItemProps) => {
  return (
    <>
      <h2>{report.title}</h2>
      <p>{report.description}</p>
      <p>
        Location: {report.location.lat}, {report.location.lng}
      </p>
      <p>Importance: {report.importance}</p>
      <p>Type: {report.type}</p>
      <p>Created At: {new Date(report.createdAt).toLocaleString()}</p>
    </>
  );
};

export default ReportsItem;
