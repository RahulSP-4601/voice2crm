import type { DashboardStats as StatsType } from "@/types/crm";

interface Props {
  stats: StatsType;
}

export default function DashboardStats({ stats }: Props) {
  const statCards = [
    {
      label: "Total Leads",
      value: stats.total_leads,
      color: "from-blue-50 to-blue-100",
      textColor: "text-blue-900",
      borderColor: "border-blue-200",
    },
    {
      label: "New",
      value: stats.new_leads,
      color: "from-purple-50 to-purple-100",
      textColor: "text-purple-900",
      borderColor: "border-purple-200",
    },
    {
      label: "Contacted",
      value: stats.contacted_leads,
      color: "from-yellow-50 to-yellow-100",
      textColor: "text-yellow-900",
      borderColor: "border-yellow-200",
    },
    {
      label: "Interested",
      value: stats.interested_leads,
      color: "from-green-50 to-green-100",
      textColor: "text-green-900",
      borderColor: "border-green-200",
    },
    {
      label: "Closed",
      value: stats.closed_leads,
      color: "from-gray-50 to-gray-100",
      textColor: "text-gray-900",
      borderColor: "border-gray-200",
    },
    {
      label: "Today's Follow-ups",
      value: stats.today_followups,
      color: "from-orange-50 to-orange-100",
      textColor: "text-orange-900",
      borderColor: "border-orange-200",
    },
    {
      label: "Overdue",
      value: stats.overdue_followups,
      color: "from-red-50 to-red-100",
      textColor: "text-red-900",
      borderColor: "border-red-200",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-xl border ${stat.borderColor} bg-gradient-to-br ${stat.color} p-4 shadow-sm transition hover:shadow-md`}
        >
          <p className="text-sm font-medium text-gray-600">{stat.label}</p>
          <p className={`mt-2 text-3xl font-bold ${stat.textColor}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
