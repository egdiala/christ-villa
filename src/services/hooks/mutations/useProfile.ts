import { useMutation } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { changePassword } from "@/services/apis/profile";

export const useChangePassword = (fn?: (v: any) => void) => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (response: any) => {
      successToast({ message: "Password has been successfully changed!" });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};
