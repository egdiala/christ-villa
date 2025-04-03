import { axiosInstance } from "../axiosInstance";
import type { LoginType, ResetPasswordType } from "@/types/auth";
import {
  FORGOT_PASSWORD_API,
  LOGIN_API,
  RESET_PASSWORD_API,
} from "@/constants/api";

export const login = async (data: LoginType) => {
  const res = await axiosInstance.post(LOGIN_API, data);
  return res.data;
};

export const forgotPassword = async (data: Partial<LoginType>) => {
  const res = await axiosInstance.post(FORGOT_PASSWORD_API, data);
  return res.data;
};

export const resetPassword = async (data: ResetPasswordType) => {
  const res = await axiosInstance.post(RESET_PASSWORD_API, data);
  return res.data;
};
