import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_CHURCH_LEADERSHIP } from "@/constants/queryKeys";
import {
  createChurchLeader,
  deleteChurchLeader,
  updateChurchLeader,
} from "@/services/apis/church-leaders";

export const useAddChurchLeader = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChurchLeader,
    onSuccess: (response: any) => {
      successToast({
        message: "Leader has been successfully created!",
      });
      queryClient.invalidateQueries({ queryKey: [GET_CHURCH_LEADERSHIP] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};

export const useDeleteChurchLeader = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteChurchLeader,
    onSuccess: (response: any) => {
      successToast({ message: "Leader has been successfully deleted!" });
      queryClient.invalidateQueries({ queryKey: [GET_CHURCH_LEADERSHIP] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};

export const useUpdateChurchLeader = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateChurchLeader,
    onSuccess: (response: any) => {
      successToast({
        message: "Leader's detail has been successfully updated!",
      });
      queryClient.invalidateQueries({ queryKey: [GET_CHURCH_LEADERSHIP] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};
