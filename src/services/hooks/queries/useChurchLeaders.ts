import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { GET_CHURCH_LEADERSHIP } from "@/constants/queryKeys";
import type { FetchChurchLeadersQuery } from "@/types/church-leaders";
import { getChurchLeadership } from "../../apis/church-leaders";

export const useGetChurchLeadership = <T>(query: FetchChurchLeadersQuery) => {
  return useQuery({
    queryKey: [GET_CHURCH_LEADERSHIP, query],
    queryFn: () => getChurchLeadership(query),
    select: (res) => res?.data as T,
    retry: false,
    throwOnError(error) {
      errorToast(error);
      return false;
    },
  });
};
