import { axiosInstance } from "../axiosInstance";
import { USERS_API } from "@/constants/api";
import { queryFormatter } from "./queryFormatter";
import { UpdateUserStatusType } from "@/types/users";

export const getAllUsers = async ({
  query,
}: {
  query: Record<string, string | number | boolean | undefined>;
}) => {
  const res = await axiosInstance.get(`${USERS_API}?${queryFormatter(query)}`);
  return res.data;
};

export const getSingleUser = async ({ user_id }: { user_id: string }) => {
  const res = await axiosInstance.get(`${USERS_API}/${user_id}`);
  return res.data;
};

export const updateUserStatus = async (data: UpdateUserStatusType) => {
  const { user_id, ...rest } = data;
  const res = await axiosInstance.put(`${USERS_API}/${user_id}`, rest);
  return res.data;
};

export const deleteUser = async ({ user_id }: { user_id: string }) => {
  const res = await axiosInstance.delete(`${USERS_API}/${user_id}`);
  return res.data;
};
