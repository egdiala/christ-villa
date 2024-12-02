import { useQuery } from "@tanstack/react-query";
import {
  getAllDepartments,
  getSingleDepartment,
} from "@/services/apis/departments";
import { FetchDepartmentsQuery } from "@/types/departments";
import { GET_DEPARTMENT, GET_DEPARTMENTS } from "@/constants/queryKeys";

export const useGetAllDepartments = <T>(query: FetchDepartmentsQuery) => {
  return useQuery({
    queryKey: [GET_DEPARTMENTS, query],
    queryFn: () => getAllDepartments(query),
    select: (res) => res.data as T,
  });
};

export const useGetSingleDepartment = ({
  department_id,
}: {
  department_id: string;
}) => {
  return useQuery({
    queryKey: [GET_DEPARTMENT, department_id],
    queryFn: () => getSingleDepartment({ department_id }),
    select: (res) => res.data,
  });
};
