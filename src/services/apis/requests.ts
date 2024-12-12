import { axiosInstance } from "../axiosInstance";
import { GET_REQUESTS_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import type { FetchRequestsQuery, UpdateRequestStatusType } from "@/types/requests";

export const getRequests = async (query: FetchRequestsQuery) => {
    const res = await axiosInstance.get(`${GET_REQUESTS_API}${createQueryString(query)}`);
    return res.data;
};

export const deleteRequest = async (request_id: string) => {
    const res = await axiosInstance.delete(`${GET_REQUESTS_API}/${request_id}`);
    return res.data;
};

export const updateRequestStatus = async (payload: UpdateRequestStatusType) => {
    const { request_id, ...data } = payload;
    const res = await axiosInstance.put(`${GET_REQUESTS_API}/${request_id}`, data);
    return res.data;
};
