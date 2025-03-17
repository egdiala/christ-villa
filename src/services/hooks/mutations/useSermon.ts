import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_SERMON_NOTES } from "@/constants/queryKeys";
import { createSermonNote, deleteSermonNote, updateSermonNote } from "@/services/apis/sermon";

export const useAddSermonNote = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSermonNote,
    onSuccess: (response: any) => {
      successToast({
        message: "Sermon Note has been successfully created!",
      });
      queryClient.invalidateQueries({ queryKey: [GET_SERMON_NOTES] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};

export const useDeleteSermonNote = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSermonNote,
    onSuccess: (response: any) => {
      successToast({ message: "Sermon Note has been successfully deleted!" });
      queryClient.invalidateQueries({ queryKey: [GET_SERMON_NOTES] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};

export const useUpdateSermonNote = (fn?: (v: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSermonNote,
    onSuccess: (response: any) => {
      successToast({
        message: "Sermon's detail has been successfully updated!",
      });
      queryClient.invalidateQueries({ queryKey: [GET_SERMON_NOTES] });
      fn?.(response);
    },
    onError: (err: any) => {
      errorToast(err);
    },
  });
};
