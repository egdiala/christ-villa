import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { GET_SERMON_NOTES } from "@/constants/queryKeys";
import { FetchSermonsQuery } from "@/types/sermon";
import { getSermonNote, getSermonNotes } from "@/services/apis/sermon";

export const useGetSermonNotes = <T>(query: FetchSermonsQuery) => {
  return useQuery({
    queryKey: [GET_SERMON_NOTES, query],
    queryFn: () => getSermonNotes(query),
    select: (res) => res?.data as T,
    retry: false,
    throwOnError(error) {
      errorToast(error);
      return false;
    },
  });
};

export const useGetSermonNote = <T>(id: string) => {
  return useQuery({
    queryKey: [GET_SERMON_NOTES, id],
    queryFn: () => getSermonNote(id),
    select: (res) => res?.data as T,
    retry: false,
    throwOnError(error) {
      errorToast(error);
      return false;
    },
  });
};
