import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { getAdmins } from "@/services/apis/admin";
import { GET_ADMINS } from "@/constants/queryKeys";
import type { FetchAdminsQuery } from "@/types/admin";

export const useGetAdmins = <T>(query: FetchAdminsQuery) => {
  return useQuery({
    queryKey: [GET_ADMINS, query],
    queryFn: () => getAdmins(query),
    select: (res) => res?.data as T,
    retry: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};