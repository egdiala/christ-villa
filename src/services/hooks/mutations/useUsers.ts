import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import {
  changeUserType,
  deleteUser,
  updateUserStatus,
} from "@/services/apis/users";
import { GET_USER } from "@/constants/queryKeys";

export const useUpdateUserStatus = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserStatus,
    onSuccess: (response: any) => {
      successToast({ message: "User status has been successfully updated!" });
      queryClient.invalidateQueries({ queryKey: [GET_USER] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};

export const useDeleteUser = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (response: any) => {
      successToast({ message: "User has been successfully deleted!" });
      queryClient.invalidateQueries({ queryKey: [GET_USER] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};

export const useChangeUserType = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeUserType,
    onSuccess: (response: any) => {
      successToast({ message: "User type has been successfully updated!" });
      queryClient.invalidateQueries({ queryKey: [GET_USER] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};
