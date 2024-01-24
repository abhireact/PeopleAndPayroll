import * as Yup from "yup";

export const organisationSchema = Yup.object({
  department: Yup.string().min(2).max(25).required("Please enter your department"),
  dept_code: Yup.string().min(2).max(25).required("Please enter your dept_code"),
  designation: Yup.string().min(2).max(25).required("Please enter your designation"),
  organization_name: Yup.string().min(2).max(25).required("Please enter your organization_name"),
  location: Yup.string().min(2).max(25).required("Please enter your location"),
  organization_type: Yup.string().min(2).max(25).required("Please enter your organization_type"),
  employee_type: Yup.string().min(2).max(25).required("Please enter your employee_type"),
  state: Yup.string().min(2).max(25).required("Please enter your state"),
  location_name: Yup.string().min(2).max(25).required("Please enter your location_name"),
  add_line2: Yup.string().min(2).max(25).required("Please enter your add_line2"),
  add_line1: Yup.string().min(2).max(25).required("Please enter your add_line1"),
  city: Yup.string().min(2).max(25).required("Please enter your city"),
  role: Yup.string().min(2).max(25).required("Please enter your role"),
  manager: Yup.string().min(2).max(25).required("Please enter your manager"),
  gender: Yup.string().min(2).max(25).required("Please enter your gender"),
  // employee_type: Yup.string().min(2).max(25).required("Please enter your employee_type"),
  source_of_hire: Yup.string().min(2).max(25).required("Please enter your source_of_hire"),
  first_name: Yup.string().min(2).max(25).required("Please enter your first_name"),
  joining_date: Yup.date().required("Please enter your joining_date"),
  dob: Yup.date().required("Please enter your dob"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  //   password: Yup.string().min(6).required("Please enter your password"),
  //   confirm_password: Yup.string()
  //     .required()
  //     .oneOf([Yup.ref("password"), null], "Password must match"),
});
