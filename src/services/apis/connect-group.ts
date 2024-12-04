import { axiosInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import { GET_CONNECT_GROUPS_API } from "@/constants/api";
import type { CreateConnectGroupType, FetchConnectGroupQuery, FetchConnectGroupsQuery } from "@/types/connect-group";

export const getConnectGroups = async (query: FetchConnectGroupsQuery) => {
    const res = await axiosInstance.get(`${GET_CONNECT_GROUPS_API}${createQueryString(query)}`);
    return res.data;
};

export const getConnectGroup = async (query: FetchConnectGroupQuery) => {
    const { id, ...rest } = query
    const res = await axiosInstance.get(`${GET_CONNECT_GROUPS_API}/${id}${createQueryString(rest)}`);
    return res.data;
};

export const createConnectGroup = async (payload: CreateConnectGroupType) => {
    const res = await axiosInstance.post(GET_CONNECT_GROUPS_API, payload);
    return res.data;
};
