import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
interface DashboardGraphProps {
  totalRequests: number;
}

const chartData = [
  { month: "January", completed: 186, pending: 80, rejected: 100 },
  { month: "February", completed: 305, pending: 200, rejected: 250 },
  { month: "March", completed: 237, pending: 120, rejected: 180 },
  { month: "April", completed: 73, pending: 190, rejected: 150 },
  { month: "May", completed: 209, pending: 130, rejected: 170 },
  { month: "June", completed: 214, pending: 140, rejected: 190 },
  { month: "July", completed: 186, pending: 80, rejected: 100 },
  { month: "August", completed: 305, pending: 200, rejected: 250 },
  { month: "September", completed: 237, pending: 120, rejected: 180 },
  { month: "October", completed: 73, pending: 190, rejected: 150 },
  { month: "November", completed: 209, pending: 130, rejected: 170 },
  { month: "December", completed: 214, pending: 140, rejected: 190 },
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

export const DashboardGraph = ({ totalRequests }: DashboardGraphProps) => {
  return (
    <div className="border border-blue-4 grid gap-y-[41px] rounded-2xl p-4 h-full content-start">
      <div className="max-w-[124px] grid gap-y-1 bg-light-blue-4 p-2">
        <p className="capitalize text-xs text-text-primary">Total Requests</p>
        <h2 className="text-xl text-text-primary">{totalRequests}</h2>
      </div>
      <div className="grid w-full h-full">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
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
              content={<ChartTooltipContent />}
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
