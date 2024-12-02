import { axiosInstance } from "../axiosInstance";
import { DEPARTMENTS_API } from "@/constants/api";
import {
  CreateDepartmentType,
  FetchDepartmentsQuery,
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

export const getSingleDepartment = async ({
  department_id,
}: {
  department_id: string;
}) => {
  const res = await axiosInstance.get(`${DEPARTMENTS_API}/${department_id}`);
  return res.data;
};
