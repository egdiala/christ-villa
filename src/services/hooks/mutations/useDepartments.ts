import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { createDepartment } from "@/services/apis/departments";
import { GET_DEPARTMENTS } from "@/constants/queryKeys";

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
