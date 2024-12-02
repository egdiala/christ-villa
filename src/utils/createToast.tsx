import { toast } from "sonner";
import { Toast, type ToastProps } from "@/components/core";

export const createToast = (options: ToastProps) =>
  toast.custom((t) => (<Toast id={t} {...options} />))

export function successToast(res: Record<string, any>, title = "Success") {
  createToast({
    title: title,
    message: res?.message ?? res,
    type: "success",
  });
}

export function errorToast(err: Record<string, any>, title = "Error") {
  createToast({
    title: title,
    message: err?.response?.data?.message ?? err?.response?.data?.msg,
    type: "error",
  });
}