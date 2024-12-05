import * as Yup from "yup";

export const changeUserTypeSchema = Yup.object().shape({
  user_type: Yup.string().required("User Type is required"),
});
