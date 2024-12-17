import * as Yup from "yup";

export const updateRequestStatusSchema = Yup.object().shape({
    status: Yup.string().required("Select a status"),
});
