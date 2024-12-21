import { CALENDAR_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import { axiosInstance } from "@/services/axiosInstance";
import type { FetchCalendarsQuery } from "@/types/calendar";

export const getCalendars = async (query: FetchCalendarsQuery) => {
    const res = await axiosInstance.get(`${CALENDAR_API}${createQueryString(query)}`);
    return res.data;
};

export const createCalendar = async (payload: FormData) => {
    const res = await axiosInstance.post(CALENDAR_API, payload, {
        headers: {
            "Accept": "application/form-data",
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

export const deleteCalendar = async (id: string) => {
    const res = await axiosInstance.delete(`${CALENDAR_API}/${id}`);
    return res.data;
};
