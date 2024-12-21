import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { GET_CALENDARS } from "@/constants/queryKeys";
import { getCalendars } from "@/services/apis/calendar";
import type { FetchCalendarsQuery } from "@/types/calendar";

export const useGetCalendars = <T>(query: FetchCalendarsQuery) => {
  return useQuery({
    queryKey: [GET_CALENDARS, query],
    queryFn: () => getCalendars(query),
    select: (res) => res?.data as T,
    retry: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};