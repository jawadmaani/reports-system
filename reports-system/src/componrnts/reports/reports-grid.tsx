import ReportsItem from "./reports-item";
import { Report } from "../../types/types";

type ReportsGridProps = {
  reports: Report[];
};

const ReportsGrid = ({ reports }:ReportsGridProps) => {
  return (
    <ul>
      {reports.map((report) => (
        <li key={report.id}>
          <ReportsItem report={report} />
        </li>
      ))}
    </ul>
  );
};

export default ReportsGrid;
