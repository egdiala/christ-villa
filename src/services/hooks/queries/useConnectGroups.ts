import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import type { FetchConnectGroupQuery, FetchConnectGroupsQuery } from "@/types/connect-group";
import { GET_CONNECT_GROUP, GET_CONNECT_GROUPS } from "@/constants/queryKeys";
import { getConnectGroup, getConnectGroups } from "@/services/apis/connect-group";

export const useGetConnectGroups = <T>(query: FetchConnectGroupsQuery) => {
  return useQuery({
    queryKey: [GET_CONNECT_GROUPS, query],
    queryFn: () => getConnectGroups(query),
    select: (res) => res?.data as T,
    retry: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useGetConnectGroup = <T>(query: FetchConnectGroupQuery) => {
  return useQuery({
    enabled: !!query.id,
    queryKey: [GET_CONNECT_GROUP, query],
    queryFn: () => getConnectGroup(query),
    select: (res) => res?.data as T,
    retry: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};