interface DashboardGraphProps {
  totalRequests: number;
}
export const DashboardGraph = ({ totalRequests }: DashboardGraphProps) => {
  return (
    <div className="border border-blue-4 grid gap-y-[41px] rounded-2xl p-4 h-full place-content-start">
      <div className="max-w-[124px] grid gap-y-1 bg-light-blue-4 p-2">
        <p className="capitalize text-xs text-text-primary">Total Requests</p>
        <h2 className="text-xl text-text-primary">{totalRequests}</h2>
      </div>
      <div></div>
    </div>
  );
};
