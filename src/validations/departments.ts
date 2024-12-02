import * as Yup from "yup";

export const addDepartmentSchema = Yup.object().shape({
  name: Yup.string().required("Department name is required"),
  description: Yup.string().optional(),
});
