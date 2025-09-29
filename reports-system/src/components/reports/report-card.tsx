import { Report } from "@/types/types";

interface ReportCardProps {
  data: Report[];
}
const ReportCard = ({ data = [] }: ReportCardProps) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Total Reports</p>
          <p className="text-2xl font-bold">{data.length}</p>
        </div>

        <div className="bg-red-100 text-red-800 rounded-lg p-4 text-center">
          <p className="text-sm">High</p>
          <p className="text-xl font-bold">
            {data.filter((r: Report) => r.importance === "high").length}
          </p>
        </div>

        <div className="bg-yellow-100 text-yellow-800 rounded-lg p-4 text-center">
          <p className="text-sm">Medium</p>
          <p className="text-xl font-bold">
            {data.filter((r: Report) => r.importance === "medium").length}
          </p>
        </div>

        <div className="bg-green-100 text-green-800 rounded-lg p-4 text-center">
          <p className="text-sm">Low</p>
          <p className="text-xl font-bold">
            {data.filter((r: Report) => r.importance === "low").length}
          </p>
        </div>
      </div>

      {data.length > 0 && (
        <div className="bg-gray-50 border rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-500">Last Report Added</p>
          <p className="font-semibold">{data[data.length - 1].title}</p>
          <p className="text-xs text-gray-400">
            {new Date(data[data.length - 1].createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </>
  );
};

export default ReportCard;
