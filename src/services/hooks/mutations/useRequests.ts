import { GET_REQUESTS } from "@/constants/queryKeys";
import { errorToast, successToast } from "@/utils/createToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRequestStatus } from "@/services/apis/requests";

// eslint-disable-next-line no-unused-vars
export const useUpdateRequestStatus = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateRequestStatus,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_REQUESTS] });
            successToast({ message: "Request Status Updated!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};