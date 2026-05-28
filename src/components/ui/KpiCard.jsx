import { TrendingUp } from "lucide-react";

function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  progress,
  accent = "blue",
}) {

  const accentStyles = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border hover:shadow-xl transition-all hover:-translate-y-1">

      {/* TOP */}
      <div className="flex items-center justify-between">

        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentStyles[accent]}`}
        >
          <Icon size={20} />
        </div>

        {trend && (
          <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
            <TrendingUp size={14} />
            {trend}
          </div>
        )}

      </div>

      {/* VALUE */}
      <h1 className="text-3xl font-bold mt-4">
        {value}
      </h1>

      <p className="text-gray-500 mt-1">
        {label}
      </p>

      {/* PROGRESS */}
      {progress !== undefined && (
        <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">

          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />

        </div>
      )}

    </div>
  );
}

export default KpiCard;