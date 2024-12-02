import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getSingleUser } from "../../apis/users";

export const useGetAllUsers = ({
  query,
}: {
  query: Record<string, string | number | boolean | undefined>;
}) => {
  return useQuery({
    queryKey: ["all-users", query],
    queryFn: () => getAllUsers({ query }),
    select: (res) => res.data,
  });
};

export const useGetSingleUser = ({ user_id }: { user_id: string }) => {
  return useQuery({
    queryKey: ["single-user", user_id],
    queryFn: () => getSingleUser({ user_id }),
    select: (res) => res.data,
    enabled: !!user_id,
  });
};
