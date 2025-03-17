import * as Yup from "yup";

export const createSermonSchema = Yup.object({
  sermon_date: Yup.string().required("Select a date"),
  preacher_name: Yup.string().required("Enter preacher's name"),
  description: Yup.string().required("Enter sermon note description"),
})