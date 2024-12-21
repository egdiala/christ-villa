import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetDashboardStatistics } from "@/services/hooks/queries/useDashboard";
import { FetchedDashboardGraphType } from "@/types/dashboard";
import { GraphFilter } from "./GraphFilter";
import { useMemo, useState } from "react";
import { format } from "date-fns";

const chartData = [
  { month: "January", completed: 0, pending: 0, rejected: 0 },
  { month: "February", completed: 0, pending: 0, rejected: 0 },
  { month: "March", completed: 0, pending: 0, rejected: 0 },
  { month: "April", completed: 0, pending: 0, rejected: 0 },
  { month: "May", completed: 0, pending: 0, rejected: 0 },
  { month: "June", completed: 0, pending: 0, rejected: 0 },
  { month: "July", completed: 0, pending: 0, rejected: 0 },
  { month: "August", completed: 0, pending: 0, rejected: 0 },
  { month: "September", completed: 0, pending: 0, rejected: 0 },
  { month: "October", completed: 0, pending: 0, rejected: 0 },
  { month: "November", completed: 0, pending: 0, rejected: 0 },
  { month: "December", completed: 0, pending: 0, rejected: 0 },
];

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#4EA507",
  },
  pending: {
    label: "Pending",
    color: "#EE8100",
  },
  rejected: {
    label: "Rejected",
    color: "#B0100D",
  },
} satisfies ChartConfig;

export const DashboardGraph = () => {
  const [graphFilter, setGraphFilter] = useState({});

  const { data: requestsMonthly } = useGetDashboardStatistics<
    FetchedDashboardGraphType[]
  >({
    component: "dashboard-request-monthly",
    ...graphFilter,
  });

    const monthlyRequests = useMemo(() => {
      return chartData.map(data => {
          // Find corresponding jobYearlyData entry based on the month number
          const jobData = requestsMonthly?.find(job => {
              const monthName = format(new Date(2023, job?.month - 1), "MMMM"); // Get the full month name
              return monthName === data.month;
          });
          
          if (jobData) {
              // Update the data with values from jobYearlyData
              return {
                  ...data,
                  completed: jobData.total_completed || "0",
                  pending: jobData.total_pending || "0",
                  rejected: jobData.total_rejected || "0",
              };
          }

          // Return the original data if no match is found
          return data;
    });
  }, [requestsMonthly]);

  return (
    <div className="border border-blue-4 grid gap-y-2 rounded-2xl p-4 h-full content-start">
      <div className="w-full flex justify-between items-center">
        <div className="max-w-[124px] grid gap-y-1 bg-light-blue-4 p-2">
          <p className="capitalize text-xs text-text-primary">Total Requests</p>
          <h2 className="text-xl text-text-primary">
            {requestsMonthly?.length ?? 0}
          </h2>
        </div>

        <GraphFilter setFilters={setGraphFilter} isLoading={false} />
      </div>
      <div className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="min-h-auto max-h-64 w-full md:ml-0 pl-0"
        >
          <LineChart
            accessibilityLayer
            data={monthlyRequests}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} stroke="transparent" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="bg-white" />}
            />
            <Line
              dataKey="completed"
              type="monotone"
              stroke="#4EA507"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="pending"
              type="monotone"
              stroke="#EE8100"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="rejected"
              type="monotone"
              stroke="#B0100D"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};
