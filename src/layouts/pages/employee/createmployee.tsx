import MDBox from "components/MDBox";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { organisationSchema } from "./schema";
import axios from "axios";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import FormField from "layouts/ecommerce/products/edit-product/components/FormField";
import Autocomplete from "@mui/material/Autocomplete";
import MDButton from "components/MDButton";
import Cookies from "js-cookie";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Link,
} from "@mui/material";
import MDInput from "components/MDInput";
import { useDispatch, useSelector } from "react-redux";
import { storeEmployeeData, storeRoleseData } from "Redux/action/dummyDataActions";
import { Input, message } from "antd";
import { useNavigate } from "react-router-dom";
const initialValues = {
  department: "",
  annual_ctc: 12000,
  template_name: "A+",
  percentofctc: 50,
  percentofbasic: 50,
  monthlybasicsalary: 0,
  convinienceallownce: 0,
  designation: "",
  email: "",
  first_name: "",
  last_name: "",
  nick_name: "",
  location: "",
  role: "",
  manager: "",
  gender: "",
  employee_type: "",
  source_of_hire: "",
  joining_date: "",
  dob: "",
  about_me: "",
  Expertise: "",
  uan: "",
  pan: "",
  aadhaar: "",
  ph_num: "",
  person_ph_num: "",
  personalemail_id: "",
  seating_location: "",
  Tags: "",
  presentaddress: "",
  permanentaddress: "",
  company_name: "",
  job_title: "",
  from_date: "",
  to_date: "",
  job_description: "",
  institute_name: "",
  degree: "",
  specialization: "",
  date_of_completion: "",
  name: "",
  relationship: "",
  ddob: "",
  education_details: [] as object[],
  dependent_details: [] as object[],
  marital_status: [] as string[],
  work_experience: [] as object[],
};
interface Values {
  annual_ctc: number;
  percentofctc: number;
}
const location_name: any[] = [];
const Employee = () => {
  const dispatched = useDispatch();
  const navigate = useNavigate();
  const [employee, setEmployee] = React.useState({});
  const [roles, setRoles] = React.useState([]);
  const [selectedlocation, setSelectedlocation] = React.useState({});
  const WorkLocation = useSelector((state: any) => state.workLocationData);
  // console.log("WorkLocation", WorkLocation);

  const location_name = [];

  if (WorkLocation && WorkLocation.length > 0) {
    const uniqueLocationNames = new Set();

    for (let i = 0; i < WorkLocation.length; i++) {
      const locationName = WorkLocation[i]["location_name"];
      uniqueLocationNames.add(locationName);
    }

    // Convert the Set to an array if needed
    location_name.push(...uniqueLocationNames);
  }

  console.log(location_name, "location");

  const Department = useSelector((state: any) => state.departmentData);
  // console.log("Department", Department);
  const dept_name = [];

  if (Department && Department.length > 0) {
    const uniqueDepartmentNames = new Set();

    for (let i = 0; i < Department.length; i++) {
      const departmentName = Department[i]["dept_name"];
      uniqueDepartmentNames.add(departmentName);
    }

    // Convert the Set to an array if needed
    dept_name.push(...uniqueDepartmentNames);
  }

  // console.log(dept_name, "departmentName");
  const Designation = useSelector((state: any) => state.designationData);
  // console.log("Designation", Designation);
  const des_name = [];

  if (Designation && Designation.length > 0) {
    const uniqueDesignationNames = new Set();

    for (let i = 0; i < Designation.length; i++) {
      const DesignationName = Designation[i]["des_name"];
      uniqueDesignationNames.add(DesignationName);
    }

    // Convert the Set to an array if needed
    des_name.push(...uniqueDesignationNames);
  }

  // console.log(des_name, "DesignationName");
  // rolesstoration
  const role_display_name = [];

  if (roles && roles.length > 0) {
    const uniquerolesNames = new Set();

    for (let i = 0; i < roles.length; i++) {
      const rolesName = roles[i]["role_display_name"];
      // console.log(rolesName, "rolesName");

      uniquerolesNames.add(rolesName);
    }

    // Convert the Set to an array if needed
    role_display_name.push(...uniquerolesNames);
  }

  // console.log(role_display_name, "role_display_name");

  const EmployeeData = useSelector((state: any) => state.employeeData);
  // console.log("EmployeeDatagggggggg", EmployeeData);
  const emoployee_name = [];
  // const manager_name = [];
  const employees = [];
  if (EmployeeData && EmployeeData.length > 0) {
    const uniqueEmployeeDataNames = new Set();

    for (let i = 0; i < EmployeeData.length; i++) {
      const { first_name, last_name } = EmployeeData[i];
      // const employeeObject = { first_name, last_name, full_name: `${first_name} ${last_name}` };
      // manager_name.push(employeeObject);
      const fullName = last_name ? `${first_name} ${last_name}` : first_name;
      employees.push({ label: fullName, value: { first_name, last_name } });
      uniqueEmployeeDataNames.add(fullName);
    }

    // Convert the Set to an array if needed
    emoployee_name.push(...uniqueEmployeeDataNames);
  }
  // console.log(emoployee_name, "EmployeeDataName");
  // manager_name.push(emoployee_name?.full_name);
  // console.log(manager_name, "manager_name");
  // Fetch Roles

  const fetchRoles = async (location_name: undefined) => {
    try {
      const response = await axios.post(
        "http://10.0.20.133:8000/mg_roles/get_roles_by_location ",
        { location_name }, // Send the location as part of the request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response, "response");

      const roles = await response.data;
      // console.log(roles, typeof roles);
      setRoles(roles);
    } catch (error) {
      console.log("Error fetching classdata:", error);
    }
  };
  React.useEffect(() => {
    dispatched(storeRoleseData(roles));
  }, [dispatched, roles]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: organisationSchema,
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      // console.log("ppppppppppppppppssssssssssssssssssssssssshhhhhhhhhh");
      // try {
      //   const response = await axios.post("http://122.166.211.176:8000/employee", values, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });
      //   if (response.status === 200) {
      //     console.log(" Created Employee Basic Successfully");
      //     navigate("/pages/employee/employee-invitation");
      //   }
      // } catch (error) {
      //   console.error("Error saving data:", error);
      // }
    },
  });
  const token = Cookies.get("token");

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post("http://122.166.211.176:8000/employee", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(" Created Employee Basic Successfully");
        navigate(`/createemployeesalarydetails?data=${values.email}`);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await fetch("http://10.0.20.133:8000/employee", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const employee = await response.json();
      setEmployee(employee);
    } catch (error) {
      console.log("Error fetching classdata:", error);
    }
  };
  React.useEffect(() => {
    dispatched(storeEmployeeData(employee));
  }, [dispatched, employee]);

  // calculating basicctcmothly%
  const ctcbasic =
    values.annual_ctc && values.percentofctc
      ? ((values.percentofctc / 100) * values.annual_ctc) / 12
      : 0;
  // calculating housingrentmothly%
  const housingrent = values.percentofbasic ? (values.percentofbasic / 100) * ctcbasic : 0;

  const fixedallownce =
    values.annual_ctc / 12 - (ctcbasic + housingrent + values.convinienceallownce);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <MDBox p={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={9}>
              <MDTypography variant="h5">{"Create New Employee"}</MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox p={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              <MDTypography variant="h6">{"Basic Details"}</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} mt={-3}>
              <FormField
                type="name"
                label="First name"
                name="first_name"
                required
                value={values.first_name}
                placeholder="Enter Your First name"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.first_name && touched.first_name}
                success={values.first_name.length && !errors.first_name}
              />
              {errors.first_name && touched.first_name ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.first_name}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4} mt={-3}>
              <FormField
                type="name"
                label="Last Name"
                name="last_name"
                required
                value={values.last_name}
                placeholder="Enter Your Last Name"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.last_name && touched.last_name}
                success={values.last_name.length && !errors.last_name}
              />
              {errors.last_name && touched.last_name ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.last_name}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4} mt={-3}>
              <FormField
                type="name"
                label="Email"
                name="email"
                required
                value={values.email}
                placeholder="Enter Your  Email "
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
                success={values.email.length && !errors.email}
              />
              {errors.email && touched.email ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.email}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={9}>
              <MDTypography variant="h6">{"Work Information"}</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "70%" }}
                // multiple
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "department", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={dept_name}
                renderInput={(params: any) => (
                  <FormField
                    label={"Department"}
                    // InputLabelProps={{ shrink: true }}
                    required
                    name="department"
                    placeholder="Enter Your department"
                    onChange={handleChange}
                    value={values.department}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.department && touched.department}
                    success={!errors.department}
                    variant="standard"
                  />
                )}
              />
              {errors.department && touched.department ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.department}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "70%" }}
                // multiple
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "designation", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={des_name}
                renderInput={(params: any) => (
                  <FormField
                    required
                    label={"Designation"}
                    InputLabelProps={{ shrink: true }}
                    name="designation"
                    placeholder="Enter Your designation"
                    onChange={handleChange}
                    value={values.designation}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.designation && touched.designation}
                    success={!errors.designation}
                    variant="standard"
                  />
                )}
              />
              {errors.designation && touched.designation ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.designation}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "70%" }}
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "location", value } });
                  // Call fetchRoles function with the selected location value
                  fetchRoles(value);
                }}
                options={location_name}
                renderInput={(params: any) => (
                  <FormField
                    required
                    label={"Location"}
                    InputLabelProps={{ shrink: true }}
                    name="location"
                    placeholder="Enter Your location"
                    onChange={handleChange}
                    value={values.location}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.location && touched.location}
                    success={!errors.location}
                    variant="standard"
                  />
                )}
              />

              {errors.location && touched.location ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.location}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "70%" }}
                // multiple
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "role", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={role_display_name}
                renderInput={(params: any) => (
                  <FormField
                    label={"Role"}
                    required
                    InputLabelProps={{ shrink: true }}
                    name="role"
                    placeholder="Enter Your role"
                    onChange={handleChange}
                    value={values.role}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.role && touched.role}
                    success={!errors.role}
                    variant="standard"
                  />
                )}
              />
              {errors.role && touched.role ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.role}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "70%" }}
                // multiple
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "employee_type", value } });
                }}
                options={["Permanent", "Temporary"]}
                renderInput={(params: any) => (
                  <FormField
                    required
                    label={"Employee Type"}
                    InputLabelProps={{ shrink: true }}
                    name="employee_type"
                    placeholder="Enter Your employee_type"
                    onChange={handleChange}
                    value={values.employee_type}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.employee_type && touched.employee_type}
                    success={!errors.employee_type}
                    variant="standard"
                  />
                )}
              />
              {errors.employee_type && touched.employee_type ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.employee_type}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "70%" }}
                // multiple
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "source_of_hire", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={["Direct", "Referral", "Web"]}
                renderInput={(params: any) => (
                  <FormField
                    label={"Source Of Hire"}
                    InputLabelProps={{ shrink: true }}
                    name="source_of_hire"
                    placeholder="Enter Your source_of_hire"
                    onChange={handleChange}
                    value={values.source_of_hire}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.source_of_hire && touched.source_of_hire}
                    success={!errors.source_of_hire}
                    variant="standard"
                  />
                )}
              />
              {errors.source_of_hire && touched.source_of_hire ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.source_of_hire}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Joining Date"
                name="joining_date"
                required
                value={values.joining_date}
                placeholder="Enter Your Joining Date"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.joining_date && touched.joining_date}
                success={values.joining_date.length && !errors.joining_date}
              />
              {errors.joining_date && touched.joining_date ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.joining_date}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={9}>
              <MDTypography variant="h6">{"Hierarchy Information"}</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* <Autocomplete
            
              sx={{ width: "70%" }}
              // multiple
              onChange={(event: any, value: any) => {
                handleChange({ target: { name: "manager", value } });
              }}
              // value={department}
              // onChange={handleMainFieldChange}
              options={emoployee_name}
              renderInput={(params: any) => (
                <FormField
                  label={"Manager"}
                  InputLabelProps={{ shrink: true }}
                  name="manager"
                  placeholder="Enter Your manager"
                  onChange={handleChange}
                  value={values.manager}
                  {...params}
                  onBlur={handleBlur}
                  error={errors.manager && touched.manager}
                  success={!errors.manager}
                  variant="standard"
                />
              )}
            />
            {errors.manager && touched.manager ? (
              // <p className="form-error">{errors.name}</p>
              <MDTypography variant="caption" fontWeight="regular" color="error">
                {errors.manager}
              </MDTypography>
            ) : null} */}
              <Autocomplete
                sx={{ width: "70%" }}
                options={employees}
                getOptionLabel={(option) => option.label} // Display employee's full name in the options
                onChange={(event, value) => {
                  if (value) {
                    const managerObject = value.value; // Extract manager's name in object format
                    handleChange({ target: { name: "manager", value: managerObject } });
                  } else {
                    handleChange({ target: { name: "manager", value: null } });
                  }
                }}
                renderInput={(params) => (
                  <FormField
                    required
                    label={"Manager"}
                    InputLabelProps={{ shrink: true }}
                    name="manager"
                    placeholder="Enter Your manager"
                    onChange={handleChange}
                    value={values.manager}
                    {...params}
                    onBlur={handleBlur}
                    // error={errors.manager && touched.manager}
                    // success={!errors.manager}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <MDTypography variant="h6">{"Personal Details"}</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Date of Birth"
                name="dob"
                required
                value={values.dob}
                placeholder="Enter Your Date of Birth"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.dob && touched.dob}
                success={values.dob.length && !errors.dob}
              />
              {errors.dob && touched.dob ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.dob}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={9} sm={4}>
              <Autocomplete
                sx={{ width: "70%" }}
                // multiple
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "gender", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={["female", "male"]}
                renderInput={(params: any) => (
                  <FormField
                    label={"Gender"}
                    InputLabelProps={{ shrink: true }}
                    name="gender"
                    placeholder="Enter Your gender"
                    onChange={handleChange}
                    value={values.gender}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.gender && touched.gender}
                    success={!errors.gender}
                    variant="standard"
                  />
                )}
              />
              {errors.gender && touched.gender ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.gender}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={9} sm={4}>
              <Autocomplete
                sx={{ width: "70%" }}
                // multiple
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "marital_status", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={["Single", "Married"]}
                renderInput={(params: any) => (
                  <FormField
                    label={"Marital Status"}
                    InputLabelProps={{ shrink: true }}
                    name="marital_status"
                    placeholder="Enter Your marital_status"
                    onChange={handleChange}
                    value={values.marital_status}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.marital_status && touched.marital_status}
                    success={!errors.marital_status}
                    variant="standard"
                  />
                )}
              />
              {errors.marital_status && touched.marital_status ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.marital_status}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                type="name"
                label="About Me "
                name="about_me"
                value={values.about_me}
                placeholder="Enter Your About Me"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.about_me && touched.about_me}
                success={values.about_me.length && !errors.about_me}
              />
              {errors.about_me && touched.about_me ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.about_me}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                type="name"
                label="Expertise"
                name="Expertise"
                value={values.Expertise}
                placeholder="Enter Your Expertise"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.Expertise && touched.Expertise}
                success={values.Expertise.length && !errors.Expertise}
              />
              {errors.Expertise && touched.Expertise ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.Expertise}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={9}>
              <MDTypography variant="h6">{"Identity Information"}</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                type="name"
                label="UAN"
                name="uan"
                value={values.uan}
                placeholder="Enter Your UAN"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.uan && touched.uan}
                success={values.uan.length && !errors.uan}
              />
              {errors.uan && touched.uan ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.uan}
                </MDTypography>
              ) : null}
            </Grid>{" "}
            <Grid item xs={12} sm={4}>
              <FormField
                type="name"
                label="PAN"
                name="pan"
                value={values.pan}
                placeholder="Enter Your PAN"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.pan && touched.pan}
                success={values.pan.length && !errors.pan}
              />
              {errors.pan && touched.pan ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.pan}
                </MDTypography>
              ) : null}
            </Grid>{" "}
            <Grid item xs={12} sm={4}>
              <FormField
                type="name"
                label="Aadhaar"
                name="aadhaar"
                value={values.aadhaar}
                placeholder="Enter Your Aadhaar"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.aadhaar && touched.aadhaar}
                success={values.aadhaar.length && !errors.aadhaar}
              />
              {errors.aadhaar && touched.aadhaar ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.aadhaar}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={9}>
              <MDTypography variant="h6">{"Contact Details"}</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                type="name"
                label="Work phone no"
                name="ph_num"
                value={values.ph_num}
                placeholder="Enter Your phone no"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.ph_num && touched.ph_num}
                success={values.ph_num.length && !errors.ph_num}
              />
              {errors.ph_num && touched.ph_num ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.ph_num}
                </MDTypography>
              ) : null}
            </Grid>{" "}
            <Grid item xs={12} sm={4}>
              <FormField
                type="name"
                label="Person Phone no"
                name="person_ph_num"
                value={values.person_ph_num}
                placeholder="Enter  Person Phone no"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.person_ph_num && touched.person_ph_num}
                success={values.person_ph_num.length && !errors.person_ph_num}
              />
              {errors.person_ph_num && touched.person_ph_num ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.person_ph_num}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                type="name"
                label="Personal EmailId"
                name="personalemail_id"
                value={values.personalemail_id}
                placeholder="Enter Personal EmailId"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.personalemail_id && touched.personalemail_id}
                success={values.personalemail_id.length && !errors.personalemail_id}
              />
              {errors.personalemail_id && touched.personalemail_id ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.personalemail_id}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                type="name"
                label="Seating Location"
                name="seating_location"
                value={values.seating_location}
                placeholder="Enter Seating Location"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.seating_location && touched.seating_location}
                success={values.seating_location.length && !errors.seating_location}
              />
              {errors.seating_location && touched.seating_location ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.seating_location}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                type="name"
                label="Tags"
                name="Tags"
                value={values.Tags}
                placeholder="Enter Your Tags"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.Tags && touched.Tags}
                success={values.Tags.length && !errors.Tags}
              />
              {errors.Tags && touched.Tags ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.Tags}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                type="name"
                label="Present Address"
                name="presentaddress"
                value={values.presentaddress}
                placeholder="Enter Your Present Address"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.presentaddress && touched.presentaddress}
                success={values.presentaddress.length && !errors.presentaddress}
              />
              {errors.presentaddress && touched.presentaddress ? (
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.presentaddress}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                type="name"
                label="Permanent Address"
                name="permanentaddress"
                value={values.permanentaddress}
                placeholder="Enter Your Permanent Address"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.permanentaddress && touched.permanentaddress}
                success={values.permanentaddress.length && !errors.permanentaddress}
              />
              {errors.permanentaddress && touched.permanentaddress ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.permanentaddress}
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={8}></Grid>
            <Grid item xs={12} sm={12} display="flex" justifyContent="flex-end">
              <MDButton variant="gradient" color="info" type="submit" onClick={handleFormSubmit}>
                {"Save And Give Salary Details"}
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </form>
    </DashboardLayout>
  );
};

export default Employee;
