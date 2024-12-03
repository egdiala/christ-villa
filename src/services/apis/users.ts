import { axiosInstance } from "../axiosInstance";
import { USERS_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import {
  FetchSingleUserQuery,
  FetchUsersQuery,
  UpdateUserStatusType,
} from "@/types/users";

export const getAllUsers = async (query: FetchUsersQuery) => {
  const res = await axiosInstance.get(
    `${USERS_API}${createQueryString(query)}`
  );
  return res.data;
};

export const getSingleUser = async ({ user_id }: FetchSingleUserQuery) => {
  const res = await axiosInstance.get(`${USERS_API}/${user_id}`);
  return res.data;
};

export const updateUserStatus = async (data: UpdateUserStatusType) => {
  const { user_id, ...rest } = data;
  const res = await axiosInstance.put(`${USERS_API}/${user_id}`, rest);
  return res.data;
};

export const deleteUser = async ({ user_id }: FetchSingleUserQuery) => {
  const res = await axiosInstance.delete(`${USERS_API}/${user_id}`);
  return res.data;
};
