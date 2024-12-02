import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { deleteUser, updateUserStatus } from "@/services/apis/users";

export const useUpdateUserStatus = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserStatus,
    onSuccess: (response: any) => {
      if (response.status === "ok") {
        successToast({ message: "User status has been successfully updated!" });
        queryClient.invalidateQueries({ queryKey: ["single-user"] });
      } else {
        fn?.(response);
      }
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
      if (response.status === "ok") {
        successToast({ message: "User has been successfully deleted!" });
        queryClient.invalidateQueries({ queryKey: ["single-user"] });
      } else {
        fn?.(response);
      }
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};
