import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_ADMINS } from "@/constants/queryKeys";
import { createAdmin} from "@/services/apis/admin";

// eslint-disable-next-line no-unused-vars
export const useCreateAdmin = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAdmin,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_ADMINS] });
            successToast({ message: "Admin Added Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};