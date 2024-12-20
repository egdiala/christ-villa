import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { GET_ANNOUNCEMENTS } from "@/constants/queryKeys";
import { getAnnouncements } from "@/services/apis/engage";
import { FetchEngageQuery } from "@/types/engage";

export const useGetAnnouncements = <T>(query: FetchEngageQuery) => {
  return useQuery({
    queryKey: [GET_ANNOUNCEMENTS, query],
    queryFn: () => getAnnouncements(query),
    select: (res) => res?.data as T,
    retry: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};