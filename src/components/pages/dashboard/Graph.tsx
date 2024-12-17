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
import { useState } from "react";

const months: Record<string, string> = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

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
  const monthlyRequests = requestsMonthly?.map((rMonthly) => {
    return {
      month: months[rMonthly.month],
      completed: rMonthly.total_completed || "0", // to ensure tooltip value for 0 is displayed when response from endpoint is 0
      pending: rMonthly.total_pending || "0",
      rejected: rMonthly.total_rejected || "0",
    };
  });

  return (
    <div className="border border-blue-4 grid gap-y-[41px] rounded-2xl p-4 h-full content-start">
      <div className="w-full flex justify-between items-center">
        <div className="max-w-[124px] grid gap-y-1 bg-light-blue-4 p-2">
          <p className="capitalize text-xs text-text-primary">Total Requests</p>
          <h2 className="text-xl text-text-primary">
            {requestsMonthly?.length ?? 0}
          </h2>
        </div>

        <GraphFilter setFilters={setGraphFilter} isLoading={false} />
      </div>
      <div className="grid w-full h-full">
        <ChartContainer
          config={chartConfig}
          className="dashboard-request-graph"
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
              wrapperStyle={{ backgroundColor: "bg-text-primary" }}
              content={
                <ChartTooltipContent className="dashboard-request-graph-tooltip" />
              }
              labelClassName="dashboard-tooltip-label"
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
