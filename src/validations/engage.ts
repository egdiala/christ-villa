import * as Yup from "yup";

export const createAnnouncementSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  user_type: Yup.string().required("Select a recipient"),
  announcement_type: Yup.string().required("Select an announcement type"),
  comment: Yup.string().nullable().when("announcement_type", {
    is: (val: string) => val === "text",
    then: () => Yup.string().required("Body is required"),
  }),
  file: Yup.mixed().nullable().when("announcement_type", {
    is: (val: string) => val === "media",
    then: () => Yup.mixed().required("File is required"),
  }),
})