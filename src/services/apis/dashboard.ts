import { axiosInstance } from "../axiosInstance";
import { GET_DASHBOARD_STATISTICS_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import { FetchDashboardStatsQuery } from "@/types/dashboard";

export const getDashboardStatistics = async (
  query: FetchDashboardStatsQuery
) => {
  const res = await axiosInstance.get(
    `${GET_DASHBOARD_STATISTICS_API}${createQueryString(query)}`
  );
  return res.data;
};
