import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import {
  approveOrRejectDepartmentRequest,
  approveOrRejectTimeOffRequest,
  assignDepartmentRequest,
  createDepartment,
  deleteDepartment,
  deleteDepartmentMaterial,
  deleteDepartmentRequest,
  updateDepartment,
  updateMemberStatus,
} from "@/services/apis/departments";
import {
  GET_DEPARTMENT,
  GET_DEPARTMENT_MATERIALS,
  GET_DEPARTMENT_REQUESTS,
  GET_DEPARTMENT_TIME_OFFS,
  GET_DEPARTMENTS,
  GET_USERS,
} from "@/constants/queryKeys";

export const useAddDepartment = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDepartment,
    onSuccess: (response: any) => {
      successToast({
        message: "Department has been successfully created!",
      });
      queryClient.invalidateQueries({ queryKey: [GET_DEPARTMENTS] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};

export const useUpdateDepartment = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDepartment,
    onSuccess: (response: any) => {
      successToast({
        message: "Department has been successfully updated!",
      });
      queryClient.invalidateQueries({ queryKey: [GET_DEPARTMENT] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};

export const useDeleteDepartment = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: (response: any) => {
      successToast({
        message: "Department has been successfully deleted!",
      });
      queryClient.invalidateQueries({ queryKey: [GET_DEPARTMENTS] });
      navigate("/departments");
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};

export const useDeleteDepartmentMaterial = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartmentMaterial,
    onSuccess: (response: any) => {
      successToast({
        message: "Material deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: [GET_DEPARTMENT_MATERIALS] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};

export const useUpdateMemberStatus = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMemberStatus,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: [GET_DEPARTMENT] });
      queryClient.invalidateQueries({ queryKey: [GET_USERS] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};

export const useAssignDepartmentRequest = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignDepartmentRequest,
    onSuccess: (response: any) => {
      successToast({
        message: "Request has been successfully assigned!",
      });
      queryClient.invalidateQueries({ queryKey: [GET_DEPARTMENTS] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};

export const useApproveOrRejectDepartmentRequest = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveOrRejectDepartmentRequest,
    onSuccess: (response: any) => {
      successToast({
        message: "Request status has been successfully updated!",
      });
      queryClient.invalidateQueries({ queryKey: [GET_DEPARTMENTS] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};

export const useDeleteDepartmentRequest = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartmentRequest,
    onSuccess: (response: any) => {
      successToast({
        message: "Department request has been successfully deleted!",
      });
      queryClient.invalidateQueries({ queryKey: [GET_DEPARTMENT_REQUESTS] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};

export const useApproveOrRejectTimeOffRequest = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveOrRejectTimeOffRequest,
    onSuccess: (response: any) => {
      successToast({
        message: "Time off request status has been successfully updated!",
      });
      queryClient.invalidateQueries({ queryKey: [GET_DEPARTMENT_TIME_OFFS] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};
