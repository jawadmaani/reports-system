import ReportsItem from "./reports-item";
import { Report } from "../../types/types";

type ReportsGridProps = {
  reports: Report[];
};

const ReportsGrid = ({ reports }: ReportsGridProps) => {
  return (
    <div className="p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <li key={report.id}>
            <ReportsItem report={report} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsGrid;
