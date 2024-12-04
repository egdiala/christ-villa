import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { GET_CONNECT_GROUPS } from "@/constants/queryKeys";
import { getConnectGroups } from "@/services/apis/connect-group";
import type { FetchConnectGroupsQuery } from "@/types/connect-group";

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