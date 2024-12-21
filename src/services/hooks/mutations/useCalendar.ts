import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_CALENDARS } from "@/constants/queryKeys";
import { createCalendar, deleteCalendar } from "@/services/apis/calendar";

export const useCreateCalendar = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCalendar,
        onSuccess: (response: any) => {
            successToast({ message: "Calendar created successfully!" });
            queryClient.invalidateQueries({ queryKey: [GET_CALENDARS] });
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err);
        },
    });
};

export const useDeleteCalendar = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCalendar,
        onSuccess: (response: any) => {
            successToast({ message: "Calendar deleted successfully!" });
            queryClient.invalidateQueries({ queryKey: [GET_CALENDARS] });
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err);
        },
    });
};