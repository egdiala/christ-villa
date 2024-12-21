import * as Yup from "yup";

export const createChurchCalendarSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  file: Yup.mixed().required("File is required"),
});
