import { axiosInstance } from "../axiosInstance";
import { ENGAGE_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import type { FetchEngageQuery } from "@/types/engage";

export const getAnnouncements = async (query: FetchEngageQuery) => {
    const res = await axiosInstance.get(`${ENGAGE_API}${createQueryString(query)}`);
    return res.data;
};

export const createAnnouncement = async (payload: FormData) => {
    const res = await axiosInstance.post(ENGAGE_API, payload, {
        headers: {
            "Accept": "application/form-data",
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

export const deleteAnnouncement = async (id: string) => {
    const res = await axiosInstance.delete(`${ENGAGE_API}/${id}`);
    return res.data;
};
