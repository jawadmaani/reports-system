import { Report } from "@/types/types";

interface ReportCardProps {
  data: Report[];
}

const ReportCard = ({ data = [] }: ReportCardProps) => {
  const stats = [
    {
      label: "Total",
      count: data.length,
      bg: "bg-gray-50",
      text: "text-gray-700",
      border: "border-gray-200",
    },
    {
      label: "High",
      count: data.filter((r) => r.importance === "high").length,
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
    },
    {
      label: "Medium",
      count: data.filter((r) => r.importance === "medium").length,
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
    },
    {
      label: "Low",
      count: data.filter((r) => r.importance === "low").length,
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`${s.bg} ${s.text} ${s.border} border rounded-lg p-2 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-sm`}
        >
          <p className="text-[10px] font-medium opacity-80">{s.label}</p>
          <p className="text-sm font-bold">{s.count}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportCard;
