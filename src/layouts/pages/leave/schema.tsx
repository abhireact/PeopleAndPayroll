import * as Yup from "yup";

export const leaveSchema = Yup.object({
  leave_type_name: Yup.string().min(2).max(25).required("Please enter  leave_name"),
  leave_type_code: Yup.string().min(2).max(25).required("Please enter  leave_code"),
  leave_type: Yup.string().min(2).max(25).required("Please enter  leave_type"),
  // description: Yup.string().min(2).max(25).required("Please enter  description"),
});
