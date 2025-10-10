import ReportsItem from "./reports-item";
import { Report } from "../../types/types";

type ReportsGridProps = {
  reports: Report[];
  onSelect?: (report: Report) => void;
};

const ReportsGrid = ({ reports, onSelect }: ReportsGridProps) => {
  return (
    <section className="p-3">
      <ul className="flex flex-col gap-2.5 divide-y divide-gray-100">
        {reports.map((report) => (
          <li key={report.id} className="pt-2 first:pt-0">
            <ReportsItem report={report} onSelect={onSelect} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ReportsGrid;
