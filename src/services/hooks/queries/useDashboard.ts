import { useQuery } from "@tanstack/react-query";
import { getDashboardStatistics } from "@/services/apis/dashboard";
import { FetchDashboardStatsQuery } from "@/types/dashboard";
import { GET_DASHBOARD_STATISTICS } from "@/constants/queryKeys";

export const useGetDashboardStatistics = <T>(
  query: FetchDashboardStatsQuery
) => {
  return useQuery({
    queryKey: [GET_DASHBOARD_STATISTICS, query],
    queryFn: () => getDashboardStatistics(query),
    select: (res) => res.data as T,
  });
};
