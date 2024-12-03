import { axiosInstance } from "../axiosInstance";
import {
  DEPARTMENT_MATERIALS_API,
  DEPARTMENT_REQUESTS_API,
  DEPARTMENT_TIME_OFFS_API,
  DEPARTMENTS_API,
  USERS_API,
} from "@/constants/api";
import {
  ApproveOrRejectDepartmentRequestType,
  AssignDepartmentRequestType,
  CreateDepartmentType,
  FetchDepartmentMaterialsQuery,
  FetchDepartmentRequestsQuery,
  FetchDepartmentsQuery,
  FetchDepartmentTimeOffsQuery,
  FetchUsersQuery,
  UpdateMemberStatusType,
} from "@/types/departments";
import { createQueryString } from "@/utils/createQuery";

export const getAllDepartments = async (query: FetchDepartmentsQuery) => {
  const res = await axiosInstance.get(
    `${DEPARTMENTS_API}${createQueryString(query)}`
  );
  return res.data;
};

export const createDepartment = async ({ name }: CreateDepartmentType) => {
  const res = await axiosInstance.post(`${DEPARTMENTS_API}`, { name });
  return res.data;
};

export const getSingleDepartment = async (query: FetchDepartmentsQuery) => {
  const { department_id, ...rest } = query;
  const res = await axiosInstance.get(
    `${DEPARTMENTS_API}/${department_id}${createQueryString(rest)}`
  );
  return res.data;
};

export const updateDepartment = async ({ name }: CreateDepartmentType) => {
  const res = await axiosInstance.put(`${DEPARTMENTS_API}`, { name });
  return res.data;
};

export const deleteDepartment = async ({
  department_id,
}: Partial<FetchDepartmentsQuery>) => {
  const res = await axiosInstance.delete(`${DEPARTMENTS_API}/${department_id}`);
  return res.data;
};

export const updateMemberStatus = async (payload: UpdateMemberStatusType) => {
  const { department_id, ...rest } = payload;
  const res = await axiosInstance.patch(
    `${DEPARTMENTS_API}/${department_id}`,
    rest
  );
  return res.data;
};

export const assignDepartmentRequest = async (
  payload: AssignDepartmentRequestType
) => {
  const { department_id } = payload;
  const res = await axiosInstance.post(
    `${DEPARTMENTS_API}/${department_id}`,
    payload
  );
  return res.data;
};

export const getDepartmentRequests = async (
  query: FetchDepartmentRequestsQuery
) => {
  const res = await axiosInstance.get(
    `${DEPARTMENT_REQUESTS_API}${createQueryString(query)}`
  );
  return res.data;
};

export const getDepartmentRequest = async (
  query: FetchDepartmentRequestsQuery
) => {
  const { request_id, ...rest } = query;
  const res = await axiosInstance.get(
    `${DEPARTMENT_REQUESTS_API}/${request_id}${createQueryString(rest)}`
  );
  return res.data;
};

export const approveOrRejectDepartmentRequest = async (
  payload: ApproveOrRejectDepartmentRequestType
) => {
  const { request_id, ...rest } = payload;
  const res = await axiosInstance.put(
    `${DEPARTMENT_REQUESTS_API}/${request_id}`,
    rest
  );
  return res.data;
};

export const deleteDepartmentRequest = async ({
  request_id,
}: Partial<ApproveOrRejectDepartmentRequestType>) => {
  const res = await axiosInstance.delete(
    `${DEPARTMENT_REQUESTS_API}/${request_id}`
  );
  return res.data;
};

export const getDepartmentTimeOffs = async (
  query: FetchDepartmentTimeOffsQuery
) => {
  const res = await axiosInstance.get(
    `${DEPARTMENT_TIME_OFFS_API}${createQueryString(query)}`
  );
  return res.data;
};

export const getDepartmentTimeOff = async (
  query: FetchDepartmentTimeOffsQuery
) => {
  const { request_id, ...rest } = query;
  const res = await axiosInstance.get(
    `${DEPARTMENT_TIME_OFFS_API}/${request_id}${createQueryString(rest)}`
  );
  return res.data;
};

export const approveOrRejectTimeOffRequest = async (
  payload: ApproveOrRejectDepartmentRequestType
) => {
  const { request_id, ...rest } = payload;
  const res = await axiosInstance.put(
    `${DEPARTMENT_TIME_OFFS_API}/${request_id}`,
    rest
  );
  return res.data;
};

export const getDepartmentMaterials = async (
  query: FetchDepartmentMaterialsQuery
) => {
  const res = await axiosInstance.get(
    `${DEPARTMENT_MATERIALS_API}${createQueryString(query)}`
  );
  return res.data;
};

export const getDepartmentMaterial = async (
  query: FetchDepartmentMaterialsQuery
) => {
  const { request_id, ...rest } = query;
  const res = await axiosInstance.get(
    `${DEPARTMENT_MATERIALS_API}/${request_id}${createQueryString(rest)}`
  );
  return res.data;
};

export const getAllUsers = async (query: FetchUsersQuery) => {
  const res = await axiosInstance.get(
    `${USERS_API}${createQueryString(query)}`
  );
  return res.data;
};
