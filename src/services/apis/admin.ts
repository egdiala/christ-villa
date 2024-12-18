import { axiosInstance } from "../axiosInstance";
import { GET_ADMINS_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import type { CreateAdminType, FetchAdminsQuery, UpdateAdminStatusType } from "@/types/admin";

export const getAdmins = async (query: FetchAdminsQuery) => {
    const res = await axiosInstance.get(`${GET_ADMINS_API}${createQueryString(query)}`);
    return res.data;
};

export const createAdmin = async (payload: CreateAdminType) => {
    const res = await axiosInstance.post(GET_ADMINS_API, payload);
    return res.data;
};

export const updateAdminStatus = async (payload: UpdateAdminStatusType) => {
    const { user_id, ...data } = payload;
    const res = await axiosInstance.patch(`${GET_ADMINS_API}/${user_id}`, data);
    return res.data;
};
