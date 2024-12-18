import { axiosInstance } from "../axiosInstance";
import { GET_CHURCH_LEADERSHIP_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import type {
  // CreateChurchLeaderType,
  FetchChurchLeadersQuery,
  UpdateChurchLeaderType,
} from "@/types/church-leaders";

export const getChurchLeadership = async (query: FetchChurchLeadersQuery) => {
  const res = await axiosInstance.get(
    `${GET_CHURCH_LEADERSHIP_API}${createQueryString(query)}`
  );
  return res.data;
};

export const createChurchLeader = async (payload: FormData) => {
  const res = await axiosInstance.post(
    `${GET_CHURCH_LEADERSHIP_API}`,
    payload,
    { headers: {
        "Accept": "application/form-data",
        "Content-Type": "multipart/form-data"
        } }
  );
  return res.data;
};

export const deleteChurchLeader = async (request_id: string) => {
  const res = await axiosInstance.delete(
    `${GET_CHURCH_LEADERSHIP_API}/${request_id}`
  );
  return res.data;
};

export const updateChurchLeader = async (payload: UpdateChurchLeaderType) => {
  const { request_id, ...rest } = payload;
  const res = await axiosInstance.put(
    `${GET_CHURCH_LEADERSHIP_API}/${request_id}`,
    rest
  );
  return res.data;
};
