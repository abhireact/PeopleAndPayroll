import * as yup from "yup";

const validationSchema = yup.object({
  org_name: yup.string().required("Please enter your organisation name"),

  add_line1: yup.string().required("Please enter Address"),
  add_line2: yup.string(),
  pincode: yup
    .number()
    .typeError("That doesn't look like a pincode ")
    .positive("can't start with a minus")
    .integer("can't include a decimal point")
    .min(6)
    .required("Please enter pincode "),

  city: yup.string().required("Please enter city"),
});
export default validationSchema;
