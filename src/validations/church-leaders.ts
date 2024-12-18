import * as Yup from "yup";

export const createChurchLeaderSchema = Yup.object().shape({
  leader_name: Yup.string().required("Leader name is required"),
  leader_position: Yup.string().required("Leader position is required"),
  //   file: Yup.string().required("Leader image is required"),
});
