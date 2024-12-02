import { useMutation } from "@tanstack/react-query";
import { login } from "../../apis/auth";
import { setItem } from "@/utils/localStorage";
import { useNavigate } from "react-router";
import { axiosInstance } from "@/services/axiosInstance";
import { errorToast, successToast } from "@/utils/createToast";
import { APP_TOKEN_STORAGE_KEY, APP_USERDATA_STORAGE_KEY } from "@/constants/utils";


function onLoginSuccess(responseData: any) {
  const { token, ...userData } = responseData;
  setItem(APP_TOKEN_STORAGE_KEY, token);
  setItem(APP_USERDATA_STORAGE_KEY, JSON.stringify(userData));
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// eslint-disable-next-line no-unused-vars
export const useLogin = (fn?: (v: any) => void) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (response: any) => {
      if (response.status === "ok") {
        if (!response?.data?.login_attempt?.account_disabled) {
          successToast({ message: "Logged In Successfully!" })
          onLoginSuccess(response?.data)
          navigate("/")
        } else {
          errorToast({ message: "Your account is disabled" })
        }
      } else {
          fn?.(response);
      }
    },
    onError: (err: any) => {
      errorToast(err)
    },
  });
};