import * as yup from "yup";

const validationSchema = yup.object({
  pan_name: yup
    .string()
    .required("Pan Name should be in correct format")
    .matches(/^[A-Z]{5}\d{4}[A-Z]$/, "PAN should be in correct format "),
  tan_name: yup
    .string()
    .required("Tan Name should be in correct format")
    .matches(/^[A-Z]{4}\d{5}[A-Z]$/, "TAN should be in correct format "),
  tds_orao_code: yup.string().required("TDS/AO Code is required"),
  tax_payment_frequency: yup.string().required("It is required"),
  deductor_name: yup.string().required("Dedcutor name  should be provided "),

  deductor_father_name: yup.string().required("Deductor Father name should be in correct format"),
});
export default validationSchema;
