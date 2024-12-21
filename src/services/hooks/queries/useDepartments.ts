import { useQuery } from "@tanstack/react-query";
import {
  getAllDepartments,
  getAllUsers,
  getDepartmentMaterials,
  getDepartmentRequest,
  getDepartmentRequests,
  getDepartmentTimeOff,
  getDepartmentTimeOffs,
  getSingleDepartment,
} from "@/services/apis/departments";
import {
  FetchDepartmentMaterialsQuery,
  FetchDepartmentRequestsQuery,
  FetchDepartmentsQuery,
  FetchDepartmentTimeOffsQuery,
  FetchUsersQuery,
} from "@/types/departments";
import {
  GET_DEPARTMENT,
  GET_DEPARTMENT_MATERIALS,
  GET_DEPARTMENT_REQUEST,
  GET_DEPARTMENT_REQUESTS,
  GET_DEPARTMENT_TIME_OFF,
  GET_DEPARTMENT_TIME_OFFS,
  GET_DEPARTMENTS,
  GET_USERS,
} from "@/constants/queryKeys";

export const useGetAllDepartments = <T>(query: FetchDepartmentsQuery) => {
  return useQuery({
    queryKey: [GET_DEPARTMENTS, query],
    queryFn: () => getAllDepartments(query),
    select: (res) => res.data as T,
  });
};

export const useGetSingleDepartment = <T>(query: FetchDepartmentsQuery) => {
  const { department_id } = query;
  return useQuery({
    queryKey: [GET_DEPARTMENT, query],
    queryFn: () => getSingleDepartment(query),
    select: (res) => res.data as T,
    enabled: !!department_id,
  });
};

export const useGetDepartmentRequests = <T>(
  query: FetchDepartmentRequestsQuery
) => {
  const { department_id } = query;
  return useQuery({
    queryKey: [GET_DEPARTMENT_REQUESTS, query],
    queryFn: () => getDepartmentRequests(query),
    select: (res) => res.data as T,
    enabled: !!department_id,
  });
};

export const useGetDepartmentRequest = (
  query: FetchDepartmentRequestsQuery
) => {
  const { department_id } = query;
  return useQuery({
    queryKey: [GET_DEPARTMENT_REQUEST, query],
    queryFn: () => getDepartmentRequest(query),
    select: (res) => res.data,
    enabled: !!department_id,
  });
};

export const useGetDepartmentTimeOffs = (
  query: FetchDepartmentTimeOffsQuery
) => {
  const { department_id } = query;
  return useQuery({
    queryKey: [GET_DEPARTMENT_TIME_OFFS, query],
    queryFn: () => getDepartmentTimeOffs(query),
    select: (res) => res.data,
    enabled: !!department_id,
  });
};

export const useGetDepartmentTimeOff = (
  query: FetchDepartmentTimeOffsQuery
) => {
  const { department_id } = query;
  return useQuery({
    queryKey: [GET_DEPARTMENT_TIME_OFF, query],
    queryFn: () => getDepartmentTimeOff(query),
    select: (res) => res.data,
    enabled: !!department_id,
  });
};

export const useGetDepartmentMaterials = <T>(
  query: FetchDepartmentMaterialsQuery
) => {
  const { department_id } = query;
  return useQuery({
    queryKey: [GET_DEPARTMENT_MATERIALS, query],
    queryFn: () => getDepartmentMaterials(query),
    select: (res) => res.data as T,
    enabled: !!department_id,
  });
};

export const useGetAllUsers = <T>(query: FetchUsersQuery) => {
  return useQuery({
    queryKey: [GET_USERS, query],
    queryFn: () => getAllUsers(query),
    select: (res) => res.data as T,
  });
};
