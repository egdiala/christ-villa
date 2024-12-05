import { GET_CONNECT_GROUPS } from "@/constants/queryKeys";
import { errorToast, successToast } from "@/utils/createToast";
import { createConnectGroup } from "@/services/apis/connect-group";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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