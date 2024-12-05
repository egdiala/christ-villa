import { GET_CONNECT_GROUP, GET_CONNECT_GROUPS } from "@/constants/queryKeys";
import { errorToast, successToast } from "@/utils/createToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConnectGroup, deleteConnectGroup, editConnectGroup } from "@/services/apis/connect-group";

// eslint-disable-next-line no-unused-vars
export const useCreateConnectGroup = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createConnectGroup,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_CONNECT_GROUPS] });
            successToast({ message: "Connect Group Created!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useEditConnectGroup = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: editConnectGroup,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_CONNECT_GROUP] });
            successToast({ message: "Connect Group Edited!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useDeleteConnectGroup = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteConnectGroup,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_CONNECT_GROUPS] });
            successToast({ message: "Connect Group Deleted!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};