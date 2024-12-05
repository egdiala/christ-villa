import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getSingleUser } from "../../apis/users";
import { FetchUsersQuery } from "@/types/users";
import { GET_USER, GET_USERS } from "@/constants/queryKeys";

export const useGetAllUsers = <T>(query: FetchUsersQuery) => {
  return useQuery({
    queryKey: [GET_USERS, query],
    queryFn: () => getAllUsers(query),
    select: (res) => res.data as T,
  });
};

export const useGetSingleUser = <T>(user_id: string) => {
  return useQuery({
    queryKey: [GET_USER, user_id],
    queryFn: () => getSingleUser({ user_id }),
    select: (res) => res.data as T,
    enabled: !!user_id,
  });
};
