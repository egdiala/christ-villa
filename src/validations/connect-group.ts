import * as Yup from "yup";

export const createConnectGroupSchema = Yup.object().shape({
    name: Yup.string().required("Enter name of connect group"),
});
