import { axiosInstance } from "../axiosInstance";
import { SERMON_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import { CreateSermonType, FetchSermonsQuery, UpdateSermonType } from "@/types/sermon";

export const getSermonNotes = async (query: FetchSermonsQuery) => {
    const res = await axiosInstance.get(`${SERMON_API}${createQueryString(query)}`);
    return res.data;
};

export const getSermonNote = async (id: string) => {
    const res = await axiosInstance.get(`${SERMON_API}/${id}`);
    return res.data;
};

export const createSermonNote = async (payload: CreateSermonType) => {
    const res = await axiosInstance.post(SERMON_API, payload);
    return res.data;
};

export const updateSermonNote = async (payload: UpdateSermonType) => {
    const { id, ...data } = payload;
    const res = await axiosInstance.put(`${SERMON_API}/${id}`, data);
    return res.data;
};

export const deleteSermonNote = async (id: string) => {
    const res = await axiosInstance.delete(`${SERMON_API}/${id}`);
    return res.data;
};
