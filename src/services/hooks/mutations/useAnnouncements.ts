import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_ANNOUNCEMENTS } from "@/constants/queryKeys";
import { errorToast, successToast } from "@/utils/createToast";
import { createAnnouncement, deleteAnnouncement } from "@/services/apis/engage";

// eslint-disable-next-line no-unused-vars
export const useCreateAnnouncement = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAnnouncement,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_ANNOUNCEMENTS] });
            successToast({ message: "Announcement Created Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useDeleteAnnouncement = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAnnouncement,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_ANNOUNCEMENTS] });
            successToast({ message: "Announcement Deleted Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};