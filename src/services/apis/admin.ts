import { axiosInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import type { FetchAdminsQuery } from "@/types/admin";
import { GET_ADMINS_API } from "@/constants/api";

export const getAdmins = async (query: FetchAdminsQuery) => {
    const res = await axiosInstance.get(`${GET_ADMINS_API}${createQueryString(query)}`);
    return res.data;
};
