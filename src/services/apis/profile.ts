import { axiosInstance } from "../axiosInstance";
import { ChangePasswordType } from "@/types/profile";
import { CHANGE_PASSWORD_API } from "@/constants/api";

export const changePassword = async (data: ChangePasswordType) => {
  const res = await axiosInstance.post(CHANGE_PASSWORD_API, data);
  return res.data;
};
