import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { GET_REQUESTS } from "@/constants/queryKeys";
import { getRequests } from "@/services/apis/requests";
import type { FetchRequestsQuery } from "@/types/requests";

export const useGetRequests = <T>(query: FetchRequestsQuery) => {
  return useQuery({
    queryKey: [GET_REQUESTS, query],
    queryFn: () => getRequests(query),
    select: (res) => res?.data as T,
    retry: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};