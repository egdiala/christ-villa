import * as Yup from "yup";
import { EmailSchema } from "./auth";

export const createAdminSchema = Yup.object().shape({
    name: Yup.string().required("Enter name of admin"),
    email: EmailSchema,
    gender: Yup.string().required("Select the gender of admin"),
    permission: Yup.array().of(Yup.string()).min(1, "At least one permission must be selected")
});