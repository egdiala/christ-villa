import * as Yup from "yup";

export const createAnnouncementSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  user_type: Yup.string().required("Select a recipient"),
  comment: Yup.string().nullable(),
  file: Yup.mixed().nullable(),
}).test(
  "comment-or-file",
  "Either a comment or a file is required",
  (values) => {
    const { comment, file } = values || {};
    return !!(comment?.trim() || file); // At least one must be present
  }
);